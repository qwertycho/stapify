# heartbeat sensor werkt met: https://www.adafruit.com/product/1073

import RPi.GPIO as GPIO
import json
import time
from graphqlclient import GraphQLClient

# Set up the GPIO pins
GPIO.setmode(GPIO.BCM)
PulseSensorPin = 2
GPIO.setup(PulseSensorPin, GPIO.IN)

# Set up the PulseSensor
Threshold = 550
Signal = 0

# graphgl client
client = GraphQLClient('https://schoolmoettestdomeinenhebben.nl/graphql')

# login query
login = '''
query Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
}
'''

# login gegevens
variablesLogin = {
    'username': 'azertycho',
    'password': '123',
}

# login antwoord
response_login = client.execute(login, variablesLogin)
# get the cookie from the response which is located in data>login>cookie
cookie = json.loads(response_login)['data']['login']







# stap toevoegen query
voegHartslagToe = '''
mutation AddStap($aantalStappen: Int!, $cookie: String!) {
    stappen(aantalStappen: $aantalStappen, cookie: $cookie) {
        code
        message
    }
}
'''

# stap toevoegen variabelen
variablesStap = {
    'aantalStappen': 1,
    'cookie': cookie
}









# Main loop
while True:
    # Read the PulseSensor value
    Signal = GPIO.input(PulseSensorPin)
    
    # print signal: signal
    print("Signal: " + str(Signal))
    
    # If the signal is above the threshold, print a message
    if Signal > Threshold:
        print("Heartbeat detected!")

        # stuur Signal naar graphql
        