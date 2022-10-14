import sqlite3

from typing import Callable, Any

# Users.db will store
# | Username | 
# | Comma-Delimitted Story (3 Sports) | 
# | Progress (Int) | 
# | Cumulative Points |
# | Opponent's Username |
# | Last Week Updated (helps detect if we forgot someone) |
# | Active (matching filter) |
# | Active This Week (For Display for People) |

class Crud(object):
    USERS_DB_FILE = "users.db" 
    
    # Unclear why you can't @staticmethod these
    # (I don't know what it does technically)
    # Check out
    # https://stackoverflow.com/questions/41921255/staticmethod-object-is-not-callable
    # (don't hae the time and it's not that important)

    def withConnCursor(func: Callable[[sqlite3.Cursor, sqlite3.Connection, Any], str]) -> str:
        """ Wrap your functions in this when you want them to have access to the database"""
        def wrapper(*args, **kwargs):
            # This should be generalized to work for multiple DB files in the future
            conn = sqlite3.connect(Crud.USERS_DB_FILE)
            c = conn.cursor()
            result = func(c, conn, *args, **kwargs)
            conn.commit()
            conn.close()
            return result
        return wrapper

    # Be able to get information for a user.
    #
    # INPUT
    # {
    #   Form : {
    #     Username: <username string>
    #   }
    # }
    #
    # OUTPUT
    # {
    #   Username: <username string>,
    #   Story: <exercise 1, exercise 2, exercise 3>,
    #   Progress: <0 | 1 | 2 | 3>,
    #   Cumulative Points: <0 | 1 | 2 | ...>,
    #   Opponent: <username string>,
    #   Last Week Updated : <datetime>,
    #   Active: <true | false>,
    #   Active This Week: <true | false>,
    # }
    @withConnCursor
    def handle_get(c: sqlite3.Cursor, conn: sqlite3.Connection, request: Any) -> str:
        # Example query
        data = c.execute("""SELECT * FROM full_data ORDER BY time_ ASC;""").fetchall()
        
        return "hello"
    
    # Be able to update the database and state for a user or set of users.
    # If the user completes their task and their opponent has not yet finished it
    # then they get a point (flag), changing their cumulative points. Progress is
    # changed regardless unless it is at 3 in which case it cannot be increased
    # or changed.
    # 
    # If the 'Weekly Update' flag is set, then the database will be updated regardless
    # to create a new comma-delimitted story, opponent, and progress. Importantly, the
    # request will have these facts which will have been pre-decided by another service
    # (on this machine or so).
    #
    # Note (very important): the weekly update should be done for ALL users. It may
    # be better to do this NOT via HTTP but instead via simply calling this function
    # directly after doing the matching algorithm.
    #
    # INPUT
    # {
    #   Is Weekly Update: <true | false>,
    #   Weekly Update : <{} | {
    #     Opponent: <username string>,
    #     Story: <exercise 1, exercise 2, exercise 3>,
    #   }>,
    #   Regular Update: <{} | {
    #     Username: <username string>,
    #     Progress: <0 | 1 | 2 | 3>,
    #   }>
    # }
    #
    # OUTPUT
    # Same as GET output.
    @withConnCursor
    def handle_post(c: sqlite3.Cursor, conn: sqlite3.Connection, request: Any) -> str:
        # XXX Example query
        # data = c.execute("""SELECT * FROM full_data ORDER BY time_ ASC;""").fetchall()
        return "hello"

def request_handler(request: Any):
    if request['method'] == 'POST':
        return "it was a post"
    if request["method"] == "GET":
        return "it was a get"

