# to use this code you need to install the following libraries:
# pip install graphqlclient
# pip install adafruit-circuitpython-mma8451

# the code:
import random
import threading
import time
import math
from graphqlclient import GraphQLClient

# graphgl client
client = GraphQLClient('https://schoolmoettestdomeinenhebben.nl/graphql')

login = '''
mutation Login(username: "azertycho", password: "123")
'''

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

totaalStap = 0
cacheStap = 0


def send_data():
    global totaalStap, cacheStap
    while True:
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
            variables['aantalStappen'] = totaalStap - cacheStap
            result = client.execute(mutation, variables)
            print('this is the result')
            print(result)
            if result is None:
                # if the server does not respond cache the step count
                cacheStap += 1
            else:
                # if the server responds reset the cached step count
                cacheStap = 0
        time.sleep(1)


# start the thread to send the data
thread = threading.Thread(target=send_data)
thread.start()

# wait for the thread to finish
thread.join()
