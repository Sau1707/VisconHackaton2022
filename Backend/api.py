from enum import Enum

from typing import List, Tuple
from datetime import datetime

from db import HistoryAction, HistoryEntry, UserEntry

# XXX have a way of serializing and deserializing entries using marshmellow
# XXX Have types for shit like preferences
# XXX Add marshmellow

"""
This file defines all the actions that can be taken w.r.t. CRUD w/
the databases. Every function in this file is a `handle_` function
that takes in a serialized (JSON) input, deserializes it, executes
some state functionality, then serializes any output and sends it
back to the frontend.
"""

# Getters
def handle_get_user_history(username: str) -> List[HistoryEntry]:
    """Return the history of a user in a JSON-deserializable format"""
    pass
def handle_get_user_details(username: str) -> UserEntry:
    """Return the details about a user in a JSON-deserializable format"""
    pass
def handle_get_user_existence(username: str) -> bool:
    """Return a boolean as to whether a user exists in a JSON-deserialized format."""
    pass

# Creators
def handle_create_user(user_entry: UserEntry) -> None:
    pass

# Updators
def handle_update_user_weekly_progress(username: str) -> None:
    pass
def handle_update_user_preferences(username: str, preferences: str) -> None:
    pass
def handle_update_user_history(username: str, preferences: str) -> None:
    pass

def handle_request():
    pass