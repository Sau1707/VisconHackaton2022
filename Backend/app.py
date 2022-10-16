from flask import Flask, request
import logging
from typing import Callable, Any
app = Flask(__name__)

def handler(request: Any, handle_func: Callable[[Any], Any]):
    rq = {}
    try:
        rq['Json'] = request.json if request.is_json else {}
    except Exception as e:
        logging.warning(f'Failed to get request.json: {e}')
        rq['Json'] = {}
    try:
        rq['Data'] = request.data
    except Exception as e:
        logging.warning(f'Failed to get request.data: {e}')
        rq['Data'] = b''
    rq['Args'] = request.args
    rq['Method'] = request.method
    return handle_func(rq)

# Getters (All information should be in the Args section)
@app.route('/user_history', methods=["GET"])
def handle_user_history():
    return handler(request, lambda x : x) # XXX

@app.route('/user_details', methods=["GET"])
def handle_user_details():
    return handler(request, lambda x : x) # XXX

@app.route('/user_details', methods=["GET"])
def handle_user_existence() -> bool:
    return handler(request, lambda x : x) # XXX

# Creators
@app.route('/user_details', methods=["POST"])
def handle_create_user():
    return handler(request, lambda x : x) # XXX

# Updators
@app.route('/user_details', methods=["POST"])
def handle_user_weekly_progress():
    return handler(request, lambda x : x) # XXX
@app.route('/user_details', methods=["POST"])
def handle_user_preferences():
    return handler(request, lambda x : x) # XXX
@app.route('/user_details', methods=["POST"])
def handle_user_history():
    return handler(request, lambda x : x) # XXX


# Admin Route
@app.route('/weekly_update/', methods=["POST"])
def handle_weekly_update():
    return handler(request, lambda x : x) # XXX

# Run a flask app on debug mode
if __name__=='__main__':
    app.run(host="0.0.0.0", port=80)