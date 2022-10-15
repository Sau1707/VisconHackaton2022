from multiprocessing.sharedctypes import Value
from typing import Union, Any, List
import requests
import json
import random
from enum import Enum
from datetime import datetime
import sqlite3
import numpy as np

# There was a circular import. This ugly nonsense should be straightened out later.
CRUD_USERS_TABLE = "user_table"

DEBUG = False

# StoryFmt is just the format of the stories we want to return.
# Normally this will be comma-delimitted exercises/courses, but
# you may want more information like the times and locations to
# be able to inform users.
class StoryFmt(Enum):
    CommaDelimited = 0
    Array = 1
    Jsons = 2

# Story creator is just a class with static methods to create stories.
class StoryCreator:
    SAMPLE_SIZE = 1000

    # Check whether a story (composed of a sequence of exercises)
    # is satisfactory for our purposes. A satisfactory set of
    # exercises should be varied and possible to do.
    def satisfactory_story(exercises: List[Any]) -> bool:
        return (
            # Should not be cancelled
            not any([ex['cancelled'] for ex in exercises]) and
            # Should be friendly to beginners
            all([ex['beginner_friendly'] for ex in exercises]) and
            # Should happen in the future
            all([datetime.now() < datetime.strptime(ex['from_date'].split('T')[0], "%Y-%m-%d") for ex in exercises]) and
            # Should be unique sports
            len(set([ex['sport_name'] for ex in exercises])) == 3
        )

    # Create a set of three exercises (a "story").
    # In the future this should take into account preferences,
    # availability, and even such obvious things as 
    # non-repeatability of type (even though that is not covered
    # right now).
    def create(fmt: StoryFmt=StoryFmt.CommaDelimited) -> Union[Any, str]:
        # Get a decent number of options from the API
        url = f"https://www.asvz.ch/asvz_api/event_search?_format=json&limit={StoryCreator.SAMPLE_SIZE}"
        resp = requests.get(url)
        status = resp.status_code
        content = json.loads(resp.content)

        if DEBUG:
            from pprint import PrettyPrinter
            print(status)
            PrettyPrinter().pprint(content)

        # Get 3 unique exercises
        exs = None
        while not exs or not StoryCreator.satisfactory_story(exs):
            # Keys are: 'results', 'count', 'facets', 'state'
            # In results it is just an array
            exs = [random.randint(0, StoryCreator.SAMPLE_SIZE - 1) for _ in range(3)]
            exs = exs = [content['results'][ex] for ex in exs]
        
        # Output the requested format
        if fmt == StoryFmt.Jsons:
            return exs
        names = [ex['sport_name'] for ex in exs]
        if fmt == StoryFmt.Array:
            return names
        return ','.join(names)

# WeeklyUpdateExecutor basically pairs up all the users in the database and
# updates their stories in pairs (resetting their progress to zero).
class WeeklyUpdateExecutor:
    def update(c: sqlite3.Cursor):
        # Get the set of users to pair up
        users = c.execute(f"""SELECT Username, Active FROM {CRUD_USERS_TABLE}""").fetchall()
        assert len(users) > 0 and all([len(user) == 2 for user in users])
        # Those should only be the active users
        users = [user[0] for user in users if bool(user[1])]
        np.random.shuffle(users)

        # Throw away the odd one out if they happen to exist
        # XXX update everything
        if len(users) % 2 == 1:
            odd = users[-1]
            c.execute(
                f"""UPDATE {CRUD_USERS_TABLE} SET ActiveThisWeek = ? WHERE Username = ?;""",
                (False, odd,))
            users.pop()

        # Pair the users
        assert len(users) % 2 == 0
        users = [(users[i], users[int(len(users)/2) + i]) for i in range(int(len(users)/2))]

        # Generate a story per user pair (could be slow... could be improved by
        # doing a single request instead of like one per pair)
        for user1, user2 in users:
            story = StoryCreator.create(StoryFmt.CommaDelimited)
            for user, opponent in [(user1, user2), (user2, user1)]:
                c.execute(
                    f"""UPDATE {CRUD_USERS_TABLE} SET Story = ?, Progress = ?, LastWeekUpdated = ?, ActiveThisWeek = ?, Active = ?, Opponent = ? WHERE Username = ?;""", (
                            story, 0, datetime.now(), True, True, opponent, user))



if __name__ == '__main__':
    # Use this to debug. The primary usage of `weekly_update` will be
    # by using imports of the`StoryCreator` and `WeeklyUpdateExecutor`
    # functions.
    names = StoryCreator.create()
    print(names)