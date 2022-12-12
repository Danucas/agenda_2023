import json
import sys

SIGNS_MAP = {
    "Dhanu": "Sagitario",
    "Makara": "Capricornio",
    "Kumbha": "Acuario",
    "Meena": "Piscis",
    "Mesha": "Aries",
    "Vrishabha": "Tauro",
    "Mithuna": "Geminis",
    "Karka": "Cancer",
    "Simha": "Leo",
    "Kanya": "Virgo",
    "Tula": "Libra",
    "Vrishchika": "Escorpio"
}

def parse_file(file_content):
    months = {

    }
    line_index = 0
    mx = []
    tmp = []
    for line in file_content:
        tmp.append(line)
        line_index += 1
        if line_index == 3:
            line_index = 0
            mx.append(tmp)
            tmp = []
    for m in mx:
        month = m[1].split(' ')[0]
        sign = SIGNS_MAP[m[0].split(' ')[0]]
        date = " ".join(m[1].split(' ')[1:])
        day = m[1].split(' ')[1]

        if month not in months.keys():
            months[month] = {}
        months[month][day] = {
            "sign": sign,
            "Date": date
        }
        with open("result.json", "w") as file:
            json.dump(months, file)
        

with open(sys.argv[1], 'r') as file:
    parse_file(file.read().split('\n'))
