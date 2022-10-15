from __future__ import annotations

from datetime import datetime
from enum import Enum
from wsgiref.validate import validator
from sqlalchemy import create_engine, Integer, String, Column, Boolean, DateTime
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import Session as MakeSession
from yaml import serialize

# Desired Functionality
# 1. Given a user and a set of exercises with dates and counts,
#    be able to tell if the user did that many exercises within
#    those dates.
# 2. Given a user know their current opponent, points, progress, if they
#    are finished, badgets, badgets progress, etc...
# 3. Given a story get some more information about it
#    including its contents, name, maybe a description (
#    or generally an ASVZ API ID)

# USERS
# | Username: text                       |
# | Current Story ID: int                |
# | Story Completion: int                | - For now this is a count
# | Story Size: int                      |
# | Current Progress: int                |
# | Cumulative Points (Victories): int   |
# | Current Opponent: text               |
# | Last Week Updated                    |
# | Active: bool                         |
# | Active This Week: bool               |
# | Dates Free: text                     | - Start/End Free Times
# | Buffer Time: int                     | - Amount of buffer time to assign before and after ASVZ
# | Sports Preferences: text             | - Comma-delimited list
# | Location Preferences: text           | - Comma-delimited list

# STORIES
# | Story ID: int                        |
# | Story Name: text                     |
# | Class Sequence: comma-delimited nids |

# HISTORY
# | Username   |
# | Action     |
# | Activity   |
# | Date       |

# XXX BADGES
# XXX | Badge ID   |
# XXX | Badge Name |
# XXX | Badge Requirements |

class HistoryAction(Enum):
    InProgressExercise  = 1
    FinishedExercise    = 2
    CancelledExercise   = 3

    def deserializeable(serialized: int) -> bool:
        return (
            serialized == HistoryAction.InProgressExercise.value or
            serialized == HistoryAction.FinishedExercise.value or
            serialized == HistoryAction.CancelledExercise.value
        )
    
    def deserialize(serialized: int) -> HistoryAction:
        return HistoryAction(serialized)
    def serialize(self: HistoryAction) -> int:
        return self.value

# https://docs.sqlalchemy.org/en/20/core/engines.html
engine = create_engine("sqlite:///users.db", echo=False)

Base = declarative_base()

USER_TABLE = "user_table"
class UserEntry(Base):
    # This is defined also in handler in Crud TODO
    __tablename__ = USER_TABLE
    # Basic Information
    Username            = Column(String, primary_key=True)
    
    # Weekly
    CurrentStoryId      = Column(Integer)
    CurrentStorySize    = Column(Integer)
    CurrentProgress     = Column(Integer)
    CurrentlyActive     = Column(Boolean)
    CurrentOpponent     = Column(String)

    # History
    TotalVictories      = Column(Integer)
    TotalClasses        = Column(Integer)

    # Preferences
    WeeklyDatesFree     = Column(String) # CSV
    DesiredBufferTime   = Column(Integer)
    SportsPreferences   = Column(String) # CSV
    LocationPreferences = Column(String) # CSV

    # Status
    LastWeekUpdated     = Column(DateTime)
    Active              = Column(Boolean)
    

    def __str__(self):
        return f'<{str(self.Username)}: {str(self.Story)}, {int(self.Progress)}/3>'

STORY_TABLE = "story_table"
class StoryEntry(Base):
    __tablename__ = STORY_TABLE

    Id                  = Column(Integer, primary_key=True)
    Name                = Column(String)
    Sequence            = Column(String) # CSV


HISTORY_TABLE = "history_table"
class HistoryEntry(Base):
    __tablename__ = HISTORY_TABLE

    # TODO we will want to have Username linked to those in the UserEntry table
    Username            = Column(String, primary_key=True)
    Action              = Column(Integer) # HistoryAction
    ActionName          = Column(String)
    ActivityId          = Column(Integer)
    Date                = Column(DateTime)


# Should be called AFTER the definitions of all our types in tables
Base.metadata.create_all(engine)

if __name__ == "__main__":
    # Demo of updating the database
    with MakeSession(engine) as session:
        # Create a user for our datbase
        u = UserEntry(
            Username='schmidt',
            CurrentStoryId=0,
            CurrentProgress=0,
            TotalVictories=0,
            CurrentOpponent='noah',
        )

        # Add them to the database
        session.add(u)

        # Commit so that we save the state
        session.commit()