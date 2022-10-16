from enum import Enum

import json
from typing import Callable, List, Tuple, Any
from datetime import datetime

from marshmallow import Schema, fields

from sqlalchemy.orm import Session as MakeSession
from sqlalchemy import desc

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

def create_tables(func):
    def wrapper(*args, **kwargs):
        DATABASE_CREATE_ALL()
        return func(*args, **kwargs)
    return wrapper

# Input and output should be schema types ala Marshmallow
# NOTE **kwargs are not supported (nor are variable number of args)
def with_io_schema(input: type, output: type):
    def decorator(func: Callable[[Any], Any]) -> Callable[[Any], Any]:
        def wrapper(to_validate: Any) -> Any:
            validated = input().loads(to_validate)
            return output().dumps(func(validated))
        return wrapper
    return decorator

"""
This file defines all the actions that can be taken w.r.t. CRUD w/
the databases. Every function in this file is a `handle_` function
that takes in a serialized (JSON) input, deserializes it, executes
some state functionality, then serializes any output and sends it
back to the frontend.
"""

# TODO a reason we are using marshmallow is because it makes it easy
# to validate data. We should actually be doing that here.

# Shared Types
class UserRequest(Schema):
    Username            = fields.Str()
class SuccessResponse(Schema):
    Success             = fields.Bool()

# Getters
class UserHistoryResponse(Schema):
    # Serialized HistoryEntries using the HistoryEntry class from db
    # Should be loaded using json dumps
    Entries             = fields.List(fields.Mapping())
class UserEntryResponse(Schema):
    # Serialized UserEntry using the UserEntry class from db
    # Should be loaded using json dumps
    UserEntry           = fields.Mapping()
class ExistsResponse(Schema):
    Exists              = fields.Bool()
# Temporary measure in case history gets super big
HISTORY_GET_LIMIT = 1000

@with_io_schema(UserRequest, UserHistoryResponse)
@create_tables
def handle_get_user_history(r: Any) -> Any:
    with MakeSession(DATABASE_ENGINE) as session:
        history_entries = session.query(
            HistoryEntry).filter(
                HistoryEntry.Username == r["Username"]).order_by(
                    desc(HistoryEntry.Date)).limit(HISTORY_GET_LIMIT).all()
        return {"Entries": [json.loads(entry.serialize()) for entry in history_entries]}
@with_io_schema(UserRequest, UserEntryResponse)
@create_tables
def handle_get_user_details(r: Any) -> Any:
    with MakeSession(DATABASE_ENGINE) as session:
        user_details = session.query(
            UserEntry).filter(
                UserEntry.Username == r["Username"]).limit(2).all()
        assert len(user_details) == 1
        return {"UserEntry": json.loads(user_details[0].serialize())}
@with_io_schema(UserRequest, ExistsResponse)
@create_tables
def handle_get_user_existence(r: Any) -> Any:
    with MakeSession(DATABASE_ENGINE) as session:
        users_details = session.query(
            UserEntry).filter(
                UserEntry.Username == r["Username"]).limit(2).all()
        assert len(users_details) < 2
        return {"Exists" : len(users_details) == 1}

# Creators
class UserCreationRequest(Schema):
    Username            = fields.Str()
    WeeklyDatesFree     = fields.List(fields.DateTime())
    DesiredBufferTime   = fields.Int()
    SportsPreferences   = fields.List(fields.Str())
    LocationPreferences = fields.List(fields.Str())
class PreferencesUpdateRequest(Schema):
    Username            = fields.Str()
    # TODO might want this to be a tuple if it works w/ JSON
    WeeklyDatesFree     = fields.List(fields.List(fields.DateTime()))
    DesiredBufferTime   = fields.Int()
    SportsPreferences   = fields.List(fields.Str())
    LocationPreferences = fields.List(fields.Str())
class UpdateUserHistoryRequest(Schema):
    # Serialized HistoryEntry using the HistoryEntry class from db
    # Should be loaded using json dumps
    HistoryEntry        = fields.Mapping()
@create_tables
def handle_create_user(r: UserCreationRequest) -> SuccessResponse:
    assert not handle_get_user_existence().dumps().exists
    # with MakeSession(DATABASE_ENGINE) as session:
    #     user = UserEntry(
    #             Username=r.Username,
    #             TotalVictories=0,
    #             CurrentlyActive=False,
    #             WeeklyDatesFree=UserCreationRequest.WeeklyDatesFree.dump(),
    #             DesiredBufferTime=30,
    #             SportsPreferences=",".join(SPORTS),
    #             LastWeekUpdated=datetime.now(),
    #             Active=True,
    #         )
    #     session.add(user)
    return SuccessResponse(Success=True)

# Updators
@create_tables
def handle_update_user_weekly_progress(r: UserRequest) -> SuccessResponse:
    # XXX
    return SuccessResponse(Success=True)
@create_tables
def handle_update_user_preferences(r: PreferencesUpdateRequest) -> SuccessResponse:
    # XXX
    return SuccessResponse(Success=True)
@create_tables
def handle_update_user_history(r: UpdateUserHistoryRequest) -> SuccessResponse:
    # XXX
    return SuccessResponse(Success=True)

# Special admin method
@create_tables
def handle_weekly_update() -> SuccessResponse:
    # XXX
    return SuccessResponse(Success=True)
