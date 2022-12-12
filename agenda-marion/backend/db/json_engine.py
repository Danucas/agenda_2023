import json

def write_data(data):
    with open('db/data.json', 'r+') as file:
        file.seek(0)
        file.write(json.dumps(data))
        file.truncate()


def update_or_create(month, day, input_data):
    response_data = None
    with open('db/data.json', 'r+') as file:
        data = json.loads(file.read())
        if month not in data.keys():
            data[month] = {}
        if day not in data[month].keys():
            data[month][day] = {}
        
        for k, val in input_data.items():
            data[month][day][k] = val
        response_data = data
    write_data(response_data)


def get_priorities(month, day):
    with open('db/data.json', 'r+') as file:
        data = json.loads(file.read())
        if (month not in data.keys()) or (day not in data[month].keys()):
            return []
        else:
            return data[month][day].get('priorities')