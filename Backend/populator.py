"""
This class houses the logic to populate the database with dummy data.
You should only run this once at the beginning for our demo.
"""

import pathlib
from datetime import datetime
# from api import handle_create_user # XXX this should be used
from db import UserEntry, BadgeEntry, StoryEntry, DATABASE_FILE, DATABASE_ENGINE, DATABASE_CREATE_ALL

# Used to populate the database using database operations
from sqlalchemy.orm import Session as MakeSession

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
    # XXX not yet important
    pass

def run_weekly_update():
    logging.info("Running weekly update")
    # XXX look at weekly_update.py which should give you a sense of what to use
    # here

# A List of Sports

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