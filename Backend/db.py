from __future__ import annotations

from enum import Enum
from sqlalchemy import create_engine, Integer, String, Column, Boolean, DateTime
from sqlalchemy.orm import declarative_base

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
# | Username                             |
# | Action                               |
# | Activity                             |
# | Date                                 |
# | Opponent                             |
# | Victor                               |

# BADGES
# | Badge ID                             |
# | Badge Name                           |
# | Badge Requirements                   |
DATABASE_FILE = "users.db"

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
    def name(self: HistoryAction) -> str:
        return (
            "InProgressExercise" if self == HistoryAction.InProgressExercise else
            "FinishedExercise" if self == HistoryAction.FinishedExercise else
            "CancelledExercise"
        )

# https://docs.sqlalchemy.org/en/20/core/engines.html
DATABASE_ENGINE = create_engine("sqlite:///users.db", echo=False)

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
    Badges              = Column(String) # Serialized/CSV

    # Preferences
    WeeklyDatesFree     = Column(String) # Serialized/CSV
    DesiredBufferTime   = Column(Integer)
    SportsPreferences   = Column(String) # Serialized/CSV
    LocationPreferences = Column(String) # Serialized/CSV

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
    Sequence            = Column(String) # Serialized/CSV


HISTORY_TABLE = "history_table"
class HistoryEntry(Base):
    __tablename__ = HISTORY_TABLE

    # TODO we will want to have Username linked to those in the UserEntry table
    Id                  = Column(Integer, primary_key=True)
    Username            = Column(String)
    Action              = Column(Integer) # Serialized/HistoryAction
    ActionName          = Column(String)
    ActivityId          = Column(Integer)
    ActivityName        = Column(String)
    Date                = Column(DateTime)

BADGE_TABLE = "badge_table"
class BadgeEntry(Base):
    __tablename__ = BADGE_TABLE
    Id                  = Column(Integer, primary_key=True)
    Name                = Column(String)
    Requirements        = Column(String) # Serialized/CSV

def DATABASE_CREATE_ALL():
    Base.metadata.create_all(DATABASE_ENGINE)