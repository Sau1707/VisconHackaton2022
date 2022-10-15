from datetime import datetime
import sqlite3

from typing import Callable, Any
from weekly_update import CRUD_USERS_TABLE

from weekly_update import WeeklyUpdateExecutor

# Use This Flag to decide whether to do print statements
# for all requests (and other debug functionality).
DEBUG = True

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
    USERS_TABLE = "user_table"
    assert USERS_TABLE == CRUD_USERS_TABLE
    
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

            # Create the table if it does not exist so that all the functions will work out of the box
            c.execute(f"""CREATE TABLE IF NOT EXISTS {Crud.USERS_TABLE} (Username text, Story text, Progress int, CumulativePoints int, Opponent text, LastWeekUpdated datetime, Active boolean, ActiveThisWeek boolean);""")
            
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
    #     Username: <username string>,
    #     Exists Test: <true | false>,
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
    # 
    # OUTPUT if the request is for User Exists
    # {
    #   Exists: <true | false>,
    # }
    @withConnCursor
    def handle_get(c: sqlite3.Cursor, conn: sqlite3.Connection, request: Any) -> str:
        # If the get request is getting existence then just return whether the user exists
        username = request['Form']['Username']
        user_exists = len(c.execute(
                f"""SELECT * FROM {Crud.USERS_TABLE} WHERE Username=?""",
                (username,)).fetchall()) > 0
        if request['Form']['Exists Test'].lower() == "true":
            return {"Exists": user_exists}
        # If the get request is getting the user return their data
        print("Generating User")
        if not user_exists:
            c.execute(
                f"""INSERT into {Crud.USERS_TABLE} VALUES (?,?,?,?,?,?,?,?);""", 
                (username, "", 0, 0, "", datetime.today(), True, False))
        print("Selecting")
        data = c.execute(
            f"""SELECT * FROM {Crud.USERS_TABLE} WHERE Username = ?""" , (username,)).fetchall()
        # We must maintain the invariant that there is ever only one row per user
        assert len(data) == 1
        (user, story, prog, cum, opp, wk, active, active_now) = data[0]
        return {
            "Username": user,
            "Story": [ex for ex in story.split(',')] if len(story) > 0 else "",
            "Progress": int(prog),
            "Cumulative Points": int(cum),
            "Opponent": opp,
            "Last Week Updated": wk,
            "Active": bool(active),
            "Active This Week": bool(active_now),
        }
    
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
    #   Username: <username string>,
    #   Opponent: <username string | empty>,
    #   Story: <exercise 1, exercise 2, exercise 3 | empty>,
    #   Progress: <0 | ... | 3 | empty>
    # }
    #
    # OUTPUT
    # Same as GET output for Regular Update and empty dict else.
    @withConnCursor
    def handle_post(c: sqlite3.Cursor, conn: sqlite3.Connection, request: Any) -> str:
        # In the first case we are updating weekly i.e. in a cron job
        if request['Form']['Is Weekly Update'].lower() == "true":
            user1 = request['Form']['Username']
            user2 = request['Form']['Opponent']
            story = request['Form']['Story']
            
            for user, opponent in [(user1, user2), (user2, user1)]:
                c.execute(
                    f"""UPDATE {Crud.USERS_TABLE} SET Story = ?, Progress = ?, LastWeekUpdated = ?, ActiveThisWeek = ?, Opponent = ? WHERE Username = ?;""", (
                            story, 0, datetime.now(), True, opponent, user))
            return {}
        
        # In teh second case we are recieving a request from the user (frontend)
        username = request['Form']["Username"]
        progress = int(request["Form"]["Progress"])

        # Sanitize progress and update
        progress = max(min(progress, 3), 0)
        c.execute(f"""UPDATE {Crud.USERS_TABLE} SET Progress = ? WHERE Username = ?;""", (progress, username,))

        # If the opponent does not have 3 points (i.e. not yet done)
        # and we do, then we should increase our points
        opponent_progress_ = c.execute(
            f"""SELECT Progress FROM {Crud.USERS_TABLE} WHERE Username=?""",
            (username,)).fetchall()
        assert len(opponent_progress_) == 1 and len(opponent_progress_[0]) == 1
        opponent_progress = int(opponent_progress_[0][0])
        # The frontend should make sure to stop the users from toggling off and back on again,
        # because otherwise they can get infinite points here.
        if progress == 3 and not opponent_progress < 3:
            c.execute(f"""UPDATE {Crud.USERS_TABLE} SET CumulativePoints = CumulativePoints + 1 WHERE Username = ?;""", (username,))
        
        # Return same output as the GET request
        conn.commit()
        return Crud.handle_get({'Form' : {'Exists Test': "false", "Username": username}})
    
    # There is no input or output for this method, but it does
    # change the state of the server completely. It will get all the users, pair them,
    # assign stories and opponents based on the pairs, and then update the database accordingly.
    @withConnCursor
    def handle_weekly_update(c: sqlite3.Cursor, conn: sqlite3.Connection) -> str:
        WeeklyUpdateExecutor.update(c)
        return {}

def request_handler(request: Any) -> Any:
    if DEBUG:
        from pprint import PrettyPrinter
        PrettyPrinter().pprint(request)
    if request['Method'] == 'POST':
        return Crud.handle_post(request)
    if request["Method"] == "GET":
        return Crud.handle_get(request)

def weekly_update_handler(request: any) -> Any:
    if DEBUG:
        from pprint import PrettyPrinter
        PrettyPrinter().pprint(request)
    assert request['Method'] == 'POST'
    return Crud.handle_weekly_update()