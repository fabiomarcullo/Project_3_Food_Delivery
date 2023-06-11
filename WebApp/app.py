import requests
from flask import Flask, jsonify, render_template

url = 'https://gbfs.citibikenyc.com/gbfs/en/station_information.json'

app = Flask(__name__)

@app.route("/")
def index ():
    return render_template("index.html")

@app.route("/api")
def api():

    response = requests.get(url)

    if response.status_code == 200:

        data = response.json()

        return jsonify(data)
    
    else:
        
        return jsonify({
            "error": "failed to get data"
        })

    return 0


if __name__ == "__main__":
    app.run()
