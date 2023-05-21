import json
import time
import network
import urequests
import random
import math
from machine import Pin

SSID = "Cryo_guest"
PASSWORD = "H0tt3nt0t"
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

while True:
    print('Sending request...')
    try:
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
        # if the length is greater than 2 a step has been taken
        if length > 2:
            totaalStap += 1
            # send the step count to the server
            response = urequests.post(url, headers=headers, data=json.dumps(data))

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
        PulseSensorPin = Pin(4, Pin.IN)

        Threshold = 500

        def calculate_average_bpm(beats, duration):
            if duration == 0:
                return 0

            average_bpm = (beats / duration) * 60
            return int(average_bpm)

        def send_data():
            global totaalStap, cacheStap
            start_time = time.time()
            beats = 0
            while True:
                # Read the PulseSensor value
                Signal = PulseSensorPin.value()

                # Print signal
                print("Signal: " + str(Signal))

                # If the signal is above the threshold, increment beat count
                if Signal > Threshold:
                    print("Heartbeat detected!")
                    beats += 1

                # Calculate duration in seconds
                duration = time.time() - start_time

                # If the duration exceeds a minute, calculate average beats per minute
                if duration >= 60:
                    average_bpm = calculate_average_bpm(beats, duration)
                    print("Average Beats Per Minute: ", average_bpm)

                    # Reset variables
                    start_time = time.time()
                    beats = 0

                    # Update the heart rate value
                    variablesHartslag['hartslag'] = average_bpm

                    print('Hartslag: ' + str(average_bpm))

                    # Send the heart rate data to the server
                    response = urequests.post(url, headers=headers, data=json.dumps(data))
                    print('Response: ' + str(response.text))
                    print('Heart rate data sent to server!')
                    break


    except OSError as e:
        print('Error: ' + str(e))

    time.sleep(1)