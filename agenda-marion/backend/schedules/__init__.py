from flask import Blueprint, request, jsonify
import db.json_engine as db

day_schedule_blueprint = Blueprint('schedule_blueprint', __name__, url_prefix="/api/v0/day")

@day_schedule_blueprint.route('/priorities', methods=['POST', 'DELETE'])
def create_or_delete_priority():
    if request.method == 'POST':
        args = request.get_json()
        month = args.get('month')
        day = args.get('day')
        priorities = args.get('priorities')

        db.update_or_create(month, day, {"priorities": priorities})

        return jsonify(msg="success created"), 200

@day_schedule_blueprint.route('/priorities', methods=['GET'])
def get_priorities():
    args = request.args
    month = args.get('month')
    day = args.get('day')

    priorities = db.get_priorities(month, day)

    return jsonify(data=priorities), 200