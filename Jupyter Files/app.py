import psycopg2
from sqlalchemy import create_engine
from flask import Flask, jsonify
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
#from sqlalchemy import create_engine, func
#from Models import restaurant


# Create an instance of the Flask application
app = Flask(__name__)

engine = create_engine("postgresql://knskdyld:qfGxP5LoTlErHnHlhVsayMFEmaXV_B-R@hansken.db.elephantsql.com/knskdyld")
Base = automap_base()
Base.prepare(autoload_with=engine)
print(Base.classes.keys())
Restaurant = Base.classes.restaurant


app = Flask(__name__)
@app.route("/")
def home():
    """List all availables API routes"""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/restaurants<br/>"
        f"/api/v1.0/rating<br/>"
        f"/api/v1.0/category<br/>"
        f"/api/v1.0/address<br/>")

@app.route('/api/v1.0/restaurants')
def get_restaurants():
    session = Session(engine)
    results = session.query(
        Restaurant.restaurant_name,
        Restaurant.rating,
        Restaurant.category,
        Restaurant.address,
        Restaurant.latitude,
        Restaurant.longitude,
        Restaurant.province
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