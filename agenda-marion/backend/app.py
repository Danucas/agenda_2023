from flask import Flask, request, jsonify
from schedules import day_schedule_blueprint
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = "Content-Type"

app.register_blueprint(day_schedule_blueprint)

if __name__ == '__main__':
    app.run("0.0.0.0", 5000)