
from flask import Flask 
from flask import request
from dummydb import DummyDB

# calling the consturctor and saving it as app
app = Flask(__name__)


# trails = []

# decorator
# when someone comes to the route aka the core of my app "/"

# convential restfull naming conventions
@app.route("/trials", methods=["GET"])
def hello_world():
    # make an instance of the object and then run one of the methods
    db = DummyDB("smapledb.txt")
    trails = db.readAllRecords()
    # return header as well and what headers or ports to allow
    # the star means any orgins
    # the second thing is for cors
    return trails, {"Access-Control-Allow-Origin":"*"}
    # return "<p>Hello, World!<p>"


@app.route("/trials", methods=["POST"])
def create_trail():
    print(request.form)
    # create another instance of the object then save to it
    db = DummyDB("smapledb.txt")
    d = {"name": request.form['name'],
    "description": request.form['description'],
    "length": request.form['length'],
    "rating": request.form['rating']}
    # what we use to do
    # trails.append(d)
    db.saveRecord(d)
    return "Created",201, {"Access-Control-Allow-Origin":"*"}


@app.route("/home")
def welcome_home():
    return "<h1>Welcome Home!<h1>"
# flask --app "name of file" run

# stateless
# so we dont have to do flask --app app run in the terminal
def main():
    app.run()
main()