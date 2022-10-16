"""
This class houses the logic to populate the database with dummy data.
You should only run this once at the beginning for our demo.
"""
import pathlib
import random
from datetime import datetime, timedelta
from tokenize import Name
# from api import handle_create_user # XXX this should be used
from db import (
    HistoryAction,
    HistoryEntry,
    UserEntry,
    BadgeEntry,
    StoryEntry,
    DATABASE_FILE,
    DATABASE_ENGINE,
    DATABASE_CREATE_ALL,
)
import numpy as np
from weekly_update import StoryCreator, StoryFmt

# Used to populate the database using database operations
from sqlalchemy.orm import Session as MakeSession
from sqlalchemy import desc

# Set up some logging
import logging
logging.basicConfig(format='%(levelname)s: %(message)s', level=logging.DEBUG)

# Some arbitrary names to be our "participants"
NAMES = [
    "Adriano",
    "Leonardo",
    "Furkan",
    "Anja",
    "Amro",
    "Jessie",
    "Jonathan",
    "Alejandro",
    "Rodrigo",
    "Daniel",
    "Arthur",
    "Richard",
    "Kevin",
    "Julius",
    "Steven",
    "Chloe",
    "Daniela",
    "Thomas",
    "George",
    "Natasha",
    "Dominique",
    "Jerry",
]

# This was copied from ../Frontend/activities.json
SPORTS = [
    "basketball",
    "fitness",
    "badminton",
    "beachwolley",
    "bigair",
    "arrow",
    "dance",
    "box",
    "taekwondo",
    "football",
    "swimming",
    "diving",
    "tabletennis",
    "hiking",
    "climbing",
    "fencing"
]
# Capitilize the first letter
SPORTS = [(sport[0].upper() + sport[1:]) for sport in SPORTS]

# TODO (these seem to be better as a fit for badges)
STORIES = [
    ("Martial Arts Master", "Taekwondo,Box,Fencing"),
    ("Racketeer", "Tabletennis,Badmington,Bigair"),
    ("Medieval Warrior", "Arrow,Fencing,Dance"),
    ("Good with Balls", "Football,Basketball,Beachwolley"),
    ("Explorer", "Swimming,Hiking,Climbing"),
    ("Whale", "Swimming,Diving,Fitness"),
]

def clear_database():
    logging.info("Deleting the previous database")
    pathlib.Path(DATABASE_FILE).unlink()

def create_database_and_tables():
    logging.info("Creating database and tables")
    DATABASE_CREATE_ALL()

def populate_stories():
    logging.info("Populating stories")
    # TODO have a way of creating some actual interesting combinations
    # that have a real "story" so to speak behind them
    with MakeSession(DATABASE_ENGINE) as session:
        for idx, (name, exercises) in enumerate(STORIES):
            story = StoryEntry(
                Id=idx,
                Name=name,
                Sequence=exercises,
            )
            session.add(story)
        session.commit()

def populate_badges():
    # TODO we want a way to make the requirements a data structure
    # and not just a sentence.
    logging.info("Populating badges")
    with MakeSession(DATABASE_ENGINE) as session:
        for idx, sport in enumerate(SPORTS):
            badge = BadgeEntry(
                Id=idx,
                Name=f"Try {sport}",
                Requirements=f"Go to one or more lessons/practices of {sport}.",
            )
            session.add(badge)
        session.commit()

def populate_users():
    # TODO use the API here
    # TODO fix the weekly dates free and sports preferences
    # TODO actually put in some preferences
    logging.info("Populating users")
    with MakeSession(DATABASE_ENGINE) as session:
        for name in NAMES:
            user = UserEntry(
                Username=name,
                TotalVictories=0,
                CurrentlyActive=False,
                WeeklyDatesFree="",
                DesiredBufferTime=30,
                SportsPreferences="",
                LastWeekUpdated=datetime.now(),
                Active=True,
            )
            session.add(user)
        session.commit()

def populate_history():
    logging.info("Populating the history of the users")
    history_length = 500
    with MakeSession(DATABASE_ENGINE) as session:
        for idx in range(history_length):
            prev_time = datetime.now() - timedelta(days=random.randint(0, 100))
            # TODO the id should actually be from the ASVZ API
            prev_sport_id = random.randint(0, len(SPORTS) - 1)
            prev_sport = SPORTS[prev_sport_id]
            prev_user = NAMES[random.randint(0, len(NAMES) - 1)]
             # HistoryAction (but exclude in progress)
            prev_action = random.randint(2, 3)
            prev_action_name = HistoryAction.deserialize(prev_action).name()
            history_entry = HistoryEntry(
                Id=idx,
                Username=prev_user,
                Action=prev_action,
                ActionName=prev_action_name,
                ActivityId=prev_sport_id,
                ActivityName=prev_sport,
                Date=prev_time,
            )
            session.add(history_entry)
        session.commit()

def run_weekly_update():
    logging.info("Running weekly update")
    # TODO implement this in the right place and not here
    with MakeSession(DATABASE_ENGINE) as session:
        # Get only the active users and shuffle them
        users = session.query(UserEntry).filter(
            UserEntry.Active == True).all()
        assert len(users) > 0
        np.random.shuffle(users)

        # Make sure the number of users is even (and if not,
        # remove one and then make them inactive this week)
        if len(users) % 2 == 1:
            session.query(UserEntry).filter(
                UserEntry.Username == users.pop()).update(
                    {"ActiveThisWeek": False})

        # Pair the users
        assert len(users) % 2 == 0
        users = [(users[i], users[int(len(users)/2) + i]) for i in range(int(len(users)/2))]

        # Generate a story per user pair (could be slow... could be improved by
        # doing a single request instead of like one per pair)
        prev_max_id = session.query(StoryEntry).order_by(desc(StoryEntry.Id)).first().Id
        for idx, (user1, user2) in enumerate(users):
            # TODO come up with a better naming system
            # TODO minimize number of queries to the ASVZ API because it is SLOW
            # Create a new story and add it to the DB
            story = StoryCreator.create(StoryFmt.CommaDelimited)
            story_id = idx + 1 + prev_max_id
            story_name = f"Story {idx}"
            session.add(StoryEntry(
                Id=story_id,
                Name=story_name,
                Sequence=story,
            ))

            # Add the story and corresponding information to each user's entry
            for user, opponent in [(user1, user2), (user2, user1)]:
                session.query(UserEntry).filter(UserEntry.Username == user.Username).update({
                    "CurrentStoryId": story_id,
                    "CurrentStorySize": len(story.split(",")),
                    "CurrentProgress": 0,
                    "CurrentlyActive": True,
                    "CurrentOpponent": opponent.Username,
                    "LastWeekUpdated": datetime.now(),
                })
        session.commit()

if __name__ == "__main__":
    clear_database()
    create_database_and_tables()

    # Create some stories and badges for
    # our users to be able to be in/have
    populate_stories()
    populate_badges()

    # Create some users and a fake past history
    populate_users()
    populate_history()
    
    # Run a weekly update so that we can pair people
    run_weekly_update()