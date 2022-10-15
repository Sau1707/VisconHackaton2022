from flask import Flask, request
import json
from handler import request_handler
app = Flask(__name__)

@app.route('/', methods=["GET", "POST"])
def display():
    # https://stackoverflow.com/questions/38637249/why-is-my-flask-request-object-always-empty
    # Form goes into
    #   request.form
    # Query Arguments (in the URL)
    #  request.args

    # print(request.form) # DEBUG
    # print(request.args) # DEBUG
    rq = {}
    rq['Form'] = request.form
    rq['Args'] = request.args
    rq['Method'] = request.method
    return request_handler(rq)

# Run a flask app on debug mode
if __name__=='__main__':
    app.run(host="0.0.0.0", port=80)