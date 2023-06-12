#!/usr/bin/env python
# coding: utf-8

# In[1]:


# Import the dependencies.
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect

from flask import Flask, jsonify


# In[2]:


#################################################
# Database Setup
#################################################

engine = create_engine("postgresql+psycopg2://knskdyld:qfGxP5LoTlErHnHlhVsayMFEmaXV_B-R@hansken.db.elephantsql.com/knskdyld")

# # reflect an existing database into a new model

Base = automap_base()

# # reflect the tables

Base.prepare(autoload_with=engine)

Base.classes.keys()


# In[3]:


#TO BE DELETEDDELETE, JUST FOR REFERENCE

inspector = inspect(engine)
columns = inspector.get_columns('restaurant')

restaurants = Base.classes.restaurant
session = Session(engine)


# In[9]:


# Create a Flask app
app = Flask(__name__)

# Define a route for retrieving the restaurant data as JSON
@app.route('/restaurants')
def get_restaurants():
    results = session.query(
        restaurants.restaurant_name,
        restaurants.rating,
        restaurants.category,
        restaurants.address,
        restaurants.latitude,
        restaurants.longitude,
        restaurants.province
    ).all()

    # Convert the results to a list of dictionaries
    restaurant_list = []
    for result in results:
        restaurant = {
            'restaurant_name': result.restaurant_name,
            'rating': result.rating,
            'category': result.category,
            'address': result.address,
            'latitude': result.latitude,
            'longitude': result.longitude,
            'province': result.province
        }
        restaurant_list.append(restaurant)

    # Return the restaurant data as JSON
    return jsonify(restaurant_list)

# Run the Flask app
if __name__ == '__main__':
    app.run()

