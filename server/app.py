
from flask import Flask 
from flask import request
# from dummydb import DummyDB
from db import DB

# calling the consturctor and saving it as app
app = Flask(__name__)

# preflight request
# will look like the non simple request
@app.route("/trials/<int:id>", methods=["OPTIONS"])
def do_preflight(id):
    # return some headers
    return '',204, {"Access-Control-Allow-Origin":"*", 
                    "Access-Control-Allow-Methods":"PUT, DELETE",
                    "Access-Control-Allow-Headers":"Content-Type"}


# trails = []

# decorator
# when someone comes to the route aka the core of my app "/"

# convential restfull naming conventions
@app.route("/trials", methods=["GET"])
def hello_world():
    # make an instance of the object and then run one of the methods
    db = DB("trails.db")
    trails = db.readAllRecords()
    # return header as well and what headers or ports to allow
    # the star means any orgins
    # the second thing is for cors
    return trails, {"Access-Control-Allow-Origin":"*"}
    # return "<p>Hello, World!<p>"


@app.route("/trials", methods=["POST"])
def create_trail():
    # print(request.form)
    # create another instance of the object then save to it
    db = DB("trails.db")
    d = {"name": request.form['name'],
    "description": request.form['description'],
    "length": request.form['length'],
    "rating": request.form['rating']}
    # what we use to do
    # trails.append(d)
    db.saveRecord(d)
    return "Created",201, {"Access-Control-Allow-Origin":"*"}

# going to traisl wiht a thning called id with a integer
@app.route("/trials/<int:id>", methods=["DELETE"])
def delete_trail(id):
    print("I am deleteing the trial", id)
    db = DB("trails.db")
    db.deleteRecord(id)

    return "Deleted", 200, {"Access-Control-Allow-Origin":"*"}

@app.route("/trials/<int:id>", methods=["PUT"])
def edit_trial(id):
    db = DB("trails.db")
    print(request.form)
    
    d = {"name": request.form['name'],
    "description": request.form['description'],
    "length": request.form['length'],
    "rating": request.form['rating']}
    # goint to need the data that changed and for what entry(id)
    db.editRecord(id,d)
    
    return "Edited", 201, {"Access-Control-Allow-Origin": "*"}

@app.route("/home")
def welcome_home():
    return "<h1>Welcome Home!<h1>"
# flask --app "name of file" run

# stateless
# so we dont have to do flask --app app run in the terminal
def main():
    app.run()
main()