from typing import Union, Any, List
import requests
import json
import random
from enum import Enum
from datetime import datetime

DEBUG = False

class StoryFmt(Enum):
    CommaDelimited = 0
    Array = 1
    Jsons = 2

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

class WeeklyUpdateExecutor:
    # XXX This should basically have one function that goes through every active user
    # XXX and then pairs them out (if odd number then you can ignore one arbitrary
    # XXX guy) and then for each pair updates them (in Crud function `handle_post`)
    # XXX such that they are eachothers opponents and they each get the same story.
    # XXX Stories can be random otherwise (i.e. across different pairs).
    # XXX Make sure to not forget to update little things like the week etc...
    # XXX Make sure to update ALL
    pass

if __name__ == '__main__':
    # Use this to debug. The primary usage of `weekly_update` will be
    # by using imports of the`StoryCreator` and `WeeklyUpdateExecutor`
    # functions.
    names = StoryCreator.create()
    print(names)