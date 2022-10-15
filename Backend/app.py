from flask import Flask, request
import json
from handler import request_handler, weekly_update_handler
app = Flask(__name__)

@app.route('/', methods=["GET", "POST"])
def handle():
    #return {"Exists": "true"}
    # https://stackoverflow.com/questions/38637249/why-is-my-flask-request-object-always-empty
    # Form goes into
    #   request.form
    # Query Arguments (in the URL)
    #  request.args

    # print(request.form) # DEBUG
    # print(request.args) # DEBUG
    rq = {}
    try:
        rq['Json'] = request.json if request.is_json else {}
    except Exception as e:
        print(f"fml: {e}")
        rq['Json'] = {}
    rq['Args'] = request.args
    rq['Method'] = request.method
    return request_handler(rq)

@app.route('/weekly_update/', methods=["POST"])
def handle_weekly_update():
    # This is a special handler
    rq = {}
    rq['Form'] = request.form
    rq['Args'] = request.args
    rq['Method'] = request.method
    return weekly_update_handler(rq)

# Run a flask app on debug mode
if __name__=='__main__':
    app.run(host="0.0.0.0", port=80)