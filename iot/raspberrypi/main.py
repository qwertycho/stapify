# MMA8451 OVERHEATING ISSUES, MISSCHIEN DOOR SHORTCIRCUIT

# to use this code you need to install the following libraries:
# pip install graphqlclient
# pip install adafruit-circuitpython-mma8451

# the code:
import threading
import board
import busio
import adafruit_mma8451
import time
import math
from graphqlclient import GraphQLClient

# Create an I2C bus object
i2c = busio.I2C(board.SCL, board.SDA)

# Create an MMA8451 object
mma = adafruit_mma8451.MMA8451(i2c)

# create cashe for steps
stepCashe = 0

# graphgl client
client = GraphQLClient('https://schoolmoettestdomeinenhebben.nl/graphql')

mutation = '''
mutation AddStap($aantalStappen: Int!, $cookie: String!) {
    stappen(aantalStappen: $aantalStappen, cookie: $cookie) {
        status
        message
    }
}
'''

variables = {
    'aantalStappen': 1,
    'cookie': 'my-cookie'
}

total_steps = 0
cache_steps = 0

def send_data():
    global total_steps, cache_steps
    while True:
        # get the x, y, z values
        x, y, z = mma.acceleration
        # print the x, y, z values
        print('x = {0:0.3f}G'.format(x))
        print('y = {0:0.3f}G'.format(y))
        print('z = {0:0.3f}G'.format(z))

        lenght = math.sqrt(x*x + y*y + z*z)
        print('lenght = {0:0.3f}G'.format(lenght))

        # # calculate the length
        # length = math.sqrt(x*x + y*y + z*z)
        # # if the length is greater than 2 a step has been taken
        # if length > 2:
        #     total_steps += 1
        #     # send the step count to the server
        #     variables['aantalStappen'] = total_steps - cache_steps
        #     result = client.execute(mutation, variables)
        #     print('this is the result')
        #     print(result)
        #     if result is None:
        #         # if the server does not respond cache the step count
        #         cache_steps += 1
        #     else:
        #         # if the server responds reset the cached step count
        #         cache_steps = 0
        time.sleep(1)

# start the thread to send the data
thread = threading.Thread(target=send_data)
thread.start()

# wait for the thread to finish
thread.join()