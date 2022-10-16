from __future__ import annotations

from datetime import datetime
from enum import Enum
import json
from typing import Callable, List, Tuple, Any, Optional
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

# We use this to store datetimes (to the minute accuracy) in the DB
STORAGE_DATETIME_FMT = "%Y%m%d%H%M"

# Serialization/Deserialization helpers
# CSV (Flipped because "Serialized" is JSON and "deserialized" is Column Entries)
def serialize_csv(preferences: str, serial_func: Callable[[str], Any]=lambda x:x) -> List[Any]:
    return [serial_func(p) for p in preferences.split(",")]
def deserialize_csv(preferences: List[Any], deserial_func: Callable[[Any], str]=lambda x:x) -> str:
    serial = ",".join([deserial_func(p) for p in preferences])
    if len(serial) > 255:
        raise ValueError("Too many preferences")
    return serial
# Datetimes
def serialize_datetime(dt: datetime) -> str:
    d = dt.strftime(STORAGE_DATETIME_FMT)
    if len(d) > 255:
        raise ValueError("Datetime too long")
    return d
def deserialize_datetime(dt: str) -> datetime:
    return datetime.strptime(STORAGE_DATETIME_FMT, dt)
# Concat
def serialize_concat(ds: List[Any], serial_func: Callable[[Any], str]) -> str:
    if len(ds) == 0:
        return ""
    cc = "".join((serial_func(d) for d in ds))
    if len(cc) > 255:
        raise ValueError("Concat too long")
    return cc
def deserialize_concat(ds: str, deserial_func: Callable[[str], Any], num_times: Optional[int] = None, d_len: Optional[int] = None) -> List[Any]:
    if not (num_times or d_len):
        raise ValueError("Need length of serialized singleton or number of times serialized")
    d_len = d_len if d_len else int(len(ds) / num_times)
    assert d_len * num_times == len(ds)
    return [] if d_len == 0 else [deserial_func(ds[i:i+d_len]) for i in range(0, num_times, d_len)]

# Create a TableSerilizeable type
class TableSerializeable:
    # Default serializers/deserializeables that should be overwritten
    # if you have any serialized data structures in the entries
    serializers = {}
    deserializers = {}
    # Used by the API, this is a generally formula for any class
    # extending this one
    def serialize(self: Any) -> str:
        _attrs = {
            c.name: getattr(self, c.name) for c in self.__table__.columns
        }
        _attrs = {key : value for key, value in _attrs.items() if value is not None}
        # TODO don't use `default=str` once we have more advanced structures
        return json.dumps({
            name : (
                self.serializers[name](_attr) if name in self.serializers else _attr
            ) for name, _attr in _attrs.items()
        }, sort_keys=True, default=str)
    def deserialize(self: Any, s: str) -> Any:
        return type(self)(**{
            key: (
                self.__class__.deserializers[key](value) if 
                key in self.__class__.deserializers else value
            ) for key, value in json.loads(s).items() if value is not None
            })

    

USER_TABLE = "user_table"
class UserEntry(Base, TableSerializeable):
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
    # NOTE buffer time is in minutes
    DesiredBufferTime   = Column(Integer)
    SportsPreferences   = Column(String) # Serialized/CSV
    LocationPreferences = Column(String) # Serialized/CSV

    # Status
    LastWeekUpdated     = Column(DateTime)
    Active              = Column(Boolean)

    # TODO these should also turn into data structures, not just lists of strings
    def deserialize_weekly_dates_free(start_stops: List[Tuple[datetime, datetime]]) -> str:
        if len(start_stops) == 0:
            return ""
        if any([start >= stop for start, stop in start_stops]):
            raise ValueError("Starts must come before stops")
        return deserialize_csv(start_stops, lambda s: serialize_concat(s, serialize_datetime))
    def serialize_weekly_dates_free(start_stops: str) -> List[List[datetime, datetime]]:
        if len(start_stops) == 0:
            return []
        return serialize_csv(start_stops, lambda s: deserialize_concat(s, deserialize_datetime, num_times=2))
    serializers = {
        "Username": serialize_csv,
        "Badges": serialize_csv,
        "WeeklyDatesFree": serialize_weekly_dates_free,
        "SportsPreferences": serialize_csv,
        "LocationPreferences": serialize_csv,
    }
    deserializers = {
        "Username": deserialize_csv,
        "Badges": deserialize_csv,
        "WeeklyDatesFree": deserialize_weekly_dates_free,
        "SportsPreferences": deserialize_csv,
        "LocationPreferences": deserialize_csv,
    }

    # TODO might want to display some more data here
    def __str__(self):
        return f'<{str(self.Username)}: {str(self.Story)}, {int(self.Progress)}/3>'

STORY_TABLE = "story_table"
class StoryEntry(Base, TableSerializeable):
    __tablename__ = STORY_TABLE

    Id                  = Column(Integer, primary_key=True)
    Name                = Column(String)
    Sequence            = Column(String) # Serialized/CSV

    serialize_sequence = serialize_csv
    deserialize_sequence = deserialize_csv

    serializers = {"Sequence" : serialize_csv}
    deserializers = {"Sequence" : deserialize_csv}


HISTORY_TABLE = "history_table"
class HistoryEntry(Base, TableSerializeable):
    __tablename__ = HISTORY_TABLE

    # TODO we will want to have Username linked to those in the UserEntry table
    Id                  = Column(Integer, primary_key=True)
    Username            = Column(String)
    Action              = Column(Integer) # TODO Serialized/HistoryAction
    ActionName          = Column(String)
    ActivityId          = Column(Integer)
    ActivityName        = Column(String)
    Date                = Column(DateTime)

BADGE_TABLE = "badge_table"
class BadgeEntry(Base, TableSerializeable):
    __tablename__ = BADGE_TABLE
    Id                  = Column(Integer, primary_key=True)
    Name                = Column(String)
    Requirements        = Column(String) # Serialized/CSV

    serializers = {"Requirements" : serialize_csv}
    deserializers = {"Requirements" : deserialize_csv}

def DATABASE_CREATE_ALL():
    Base.metadata.create_all(DATABASE_ENGINE)