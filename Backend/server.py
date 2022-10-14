import sqlite3
from datetime import datetime
import json

from typing import Callable, Any

class Crud(object):
    USERS_DB_FILE = "users.db" 
    STORIES_DBFILE = "stories.db" 

    def __init__(self):
        pass

    # Unclear why you can't @staticmethod these
    # (I don't know what it does technically)
    # Check out
    # https://stackoverflow.com/questions/41921255/staticmethod-object-is-not-callable
    # (don't hae the time and it's not that important)

    def withConnCursor(func: Callable[[sqlite3.Cursor, sqlite3.Connection, Any], str]) -> str:
        """ Wrap your functions in this when you want them to have access to the database"""
        def wrapper(*args, **kwargs):
            conn = sqlite3.connect(Crud.DB_FILE)
            c = conn.cursor()
            result = func(c, conn, *args, **kwargs)
            conn.commit()
            conn.close()
            return result
        return wrapper

    @withConnCursor
    def handle_db_api_get(c: sqlite3.Cursor, conn: sqlite3.Connection, request: Any) -> str:
        # Example query
        # data = c.execute("""SELECT * FROM full_data ORDER BY time_ ASC;""").fetchall()
        
        return "hello"

def request_handler(request: Any):
    if request['method'] == 'POST':
        return "it was a post"
    if request["method"] == "GET":
        return "it was a get"

