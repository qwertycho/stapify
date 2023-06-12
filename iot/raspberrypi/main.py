import json
import time
import network
import urequests
import random
import math
from machine import Pin

SSID = "Mutahar"
PASSWORD = "someGeamers"
wlan = network.WLAN(network.STA_IF)

print("SSID + PASSWORD ingevuld")

wlan.active(True)
wlan.connect(SSID, PASSWORD)
print("WLAN connectie gemaakt")

while wlan.isconnected() == False:
    print('Waiting for connection...')
    time.sleep(1)
print('Connected to WiFi!')

url = 'https://schoolmoettestdomeinenhebben.nl/graphql'
headers = {'Content-Type': 'application/json'}
query = '''
query{
    login(username: "azertycho", password: "123")
}
'''
variables = {'cookie': 'my-cookie'}
data = {'query': query, 'variables': variables}

print('Sending request...')
response = urequests.post(url, headers=headers, data=json.dumps(data))
login = response.json()['data']['login']

print('Cookie: ' + login)

# Mutation to add step count
voegStapToe = '''
mutation AddStap($aantalStappen: Int!, $cookie: String!) {
    stappen(aantalStappen: $aantalStappen, cookie: $cookie) {
        code
        message
    }
}
'''

# stap varriabelen
variablesStap = {
    'aantalStappen': 1,
    'cookie': login
}

totaalStap = 0
cacheStap = 0

# Mutation to add heart rate
voegHartslagToe = '''
        mutation AddHartslag($hartslag: Int!, $cookie: String!) {
            hartslag(hartslag: $hartslag, cookie: $cookie) {
                code
                message
            }
        }
        '''

# hartslag varriabelen
variablesHartslag = {
    'hartslag': 0,
    'cookie': login
}

# Set up GPIO for PulseSensor
PulseSensorPin = machine.ADC(26)

Threshold = 900

start_time = time.time()

beats = 0


def create_stap():
    global totaalStap
    global cacheStap

    # create a random x, y, z value between 0 and 5
    x = random.randint(0, 5)
    y = random.randint(0, 5)
    z = random.randint(0, 5)
    # print the x, y, z values
    print('x = {0:0.3f}G'.format(x))
    print('y = {0:0.3f}G'.format(y))
    print('z = {0:0.3f}G'.format(z))

    # calculate the length
    length = math.sqrt(x*x + y*y + z*z)
    print('length = {0:0.3f}G'.format(length))

    # if the length is greater than 2 a step has been taken
    if length > 2:
        totaalStap += 1


def calculate_average_bpm(beats, duration):
    # print a message to the console
    print("calculating average bpm")
    # Calculate average beats per minute
    average_bpm = beats / duration * 60

    # make the bpm an int
    average_bpm = int(average_bpm)

    return average_bpm


def get_heartbeat():
    global beats
    global start_time

    # Read the PulseSensor value
    Signal = PulseSensorPin.read_u16()

    # If the signal is above the threshold, increment beat count
    if Signal > Threshold:
        print("Heartbeat detected!")

        beats += 1

        # Calculate duration in seconds
        duration = time.time() - start_time

        print("duration: ", duration)
        print("beats: ", beats)

        while Signal > Threshold:
            # wait for the signal to drop below the threshold
            Signal = PulseSensorPin.read_u16()

        # If the duration exceeds a minute, calculate average beats per minute
        if duration >= 60:
            average_bpm = calculate_average_bpm(beats, duration)
            print("Average Beats Per Minute: ", average_bpm)

            start_time = time.time()
            beats = 0

            return average_bpm


def send_data(average_bpm):
    # send heart rate to database
    variablesHartslag['hartslag'] = average_bpm
    dataHartslag = {'query': voegHartslagToe,
                    'variables': variablesHartslag}
    responseHartslag = urequests.post(
        url, headers=headers, data=json.dumps(dataHartslag))
    print(responseHartslag.json())


while True:
    print('Sending request...')
    try:
        create_stap()
        average_bpm = get_heartbeat()
        send_data(average_bpm)

    except OSError as e:
        print('Error: ' + str(e))

    time.sleep(1)
