from flask import Flask, request
import logging
import json
from typing import Callable, Any
from marshmallow import Schema

from api import (
    handle_create_user,
    handle_get_user_details,
    handle_get_user_existence,
    handle_get_user_history,
    handle_update_user_history,
    handle_update_user_preferences,
    handle_update_user_weekly_progress,
    handle_weekly_update
)

# Initialize flask server
app = Flask(__name__)

def handler(request: Any, handle_func: Callable[[Schema], Schema]):
    data = None
    if request.method == "GET":
        # We dump here for marshmallow to do validation later
        data = json.dumps(request.args)
    elif request.method == "POST":
        data = request.data
    return handle_func(data)

# Getters (All information should be in the Args section)
@app.route('/user_history', methods=["GET"])
def handle_user_history():
    return handler(request, handle_get_user_history)

@app.route('/user_details', methods=["GET"])
def handle_user_details():
    return handler(request, handle_get_user_details)

@app.route('/user_exists', methods=["GET"])
def handle_user_existence() -> bool:
    return handler(request, handle_get_user_existence)

# Creators
@app.route('/create_user', methods=["POST"])
def handle_user_creation():
    return handler(request, handle_create_user)

# Updators
@app.route('/update_user_weekly_progress', methods=["POST"])
def handle_user_weekly_progress():
    return handler(request, handle_update_user_weekly_progress)
@app.route('/update_user_preferences', methods=["POST"])
def handle_user_preferences():
    return handler(request, handle_update_user_preferences)
@app.route('/update_user_history', methods=["POST"])
def handle_user_history_update():
    return handler(request, handle_update_user_history)


# Admin Route
@app.route('/weekly_update/', methods=["POST"])
def handle_weekly_update():
    return handle_weekly_update().dumps()

# Run a flask app on debug mode
if __name__=='__main__':
    app.run(host="0.0.0.0", port=80)