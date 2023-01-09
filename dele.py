import json

f = open("./data.json")
data = json.loads(f.read())

finalData = []

for key, value in data.items():
    for key1, value1 in value.items():
        tempValue = []
        for key2, value2 in value1.items():
            tempValue.append({"name": key2, "value": value2})
            pass
        finalData.append({"name": key1, "value": tempValue})

print(finalData)
