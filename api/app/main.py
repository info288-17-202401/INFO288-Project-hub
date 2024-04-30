import psycopg2, os
import flask
from flask import request, jsonify
app = flask.Flask(__name__)


@app.route("/hello", methods=["GET"])
def say_hello():
    return jsonify({"msg": "Hello from Flask"})


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)




