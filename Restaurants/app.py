import numpy as np
import pandas as pd
import datetime as dt

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

username = 'your_username'
password = 'your_password'
host = 'your_host'
database = 'your_database'

# Construct the URL using the format: dialect+driver://username:password@host:port/database
url = f'postgresql://{username}:{password}@{host}/{database}'
#Data Base Setup

engine= create_engine("/Users/yamilethcova/Documents/GitHub/Project_3_Food_Delivery/Resourses/Restaurant_DB_File (1).json")
Base = automap_base
Base.prepare(autoload_with=engine)
Base.classes.keys()

['Restaurant_Name',
 'Rating',
 'Category',
 'Address',
 'latitude',
 'longitude',
 'province']

#setup flask
app = Flask(__name__)

#Flask Routes
@app.route("/")
def home():
    """List all availables API routes"""
    return(
        f"Available Routes:<br/>"
        f"/api/v1.0/Restaurant_Name<br/>"
        f"/api/v1.0/Address<br/>"
        f"/api/v1.0/Category<br/>"
        f"/api/v1.0/Rating<br/>"
        f"/api/v1.0/longitude<br/>"
        f"/api/v1.0/latitude<br/>"
    )
if __name__=='__main__':
    app.run(debug=True, port=3000)







