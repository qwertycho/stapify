import json
import random
import threading
import time
import math
import requests

from graphqlclient import GraphQLClient

# GraphQL client
client = GraphQLClient('https://schoolmoettestdomeinenhebben.nl/graphql')

# Login query
login = '''
query Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
}
'''

# Login variables
variablesLogin = {
    'username': 'azertycho',
    'password': '123',
}

# Login response
response_login = client.execute(login, variablesLogin)
# Get the cookie from the response which is located in data > login > cookie
cookie = json.loads(response_login)['data']['login']

# Mutation to add step count
voegStapToe = '''
mutation AddStap($aantalStappen: Int!, $cookie: String!) {
    stappen(aantalStappen: $aantalStappen, cookie: $cookie) {
        code
        message
    }
}
'''

# Mutation to add heart rate
voegHartslagToe = '''
mutation AddHartslag($hartslag: Int!, $cookie: String!) {
    hartslag(hartslag: $hartslag, cookie: $cookie) {
        code
        message
    }
}
'''

# Step count variables
variablesStap = {
    'aantalStappen': 1,
    'cookie': cookie
}

# Heart rate variables
variablesHartslag = {
    'hartslag': 80,
    'cookie': cookie
}

totaalStap = 0
cacheStap = 0

url = 'http://localhost:7071/api/graphql'
headers = {'Content-Type': 'application/json'}

def send_data():
    global totaalStap, cacheStap
    while True:
        # Create random x, y, z values between 0 and 5
        x = random.randint(0, 5)
        y = random.randint(0, 5)
        z = random.randint(0, 5)
        # Print the x, y, z values
        print('x = {0:0.3f}G'.format(x))
        print('y = {0:0.3f}G'.format(y))
        print('z = {0:0.3f}G'.format(z))

        # Calculate the length
        length = math.sqrt(x*x + y*y + z*z)
        # If the length is greater than 2, a step has been taken
        if length > 2:
            totaalStap += 1
            # Send the step count to the server
            variablesStap['aantalStappen'] = totaalStap - cacheStap
            result = client.execute(voegStapToe, variablesStap)
            print('this is the result')
            print(result)
            if result is None:
                # If the server does not respond, cache the step count
                cacheStap += 1
            else:
                # If the server responds, reset the cached step count
                cacheStap = 0

            # Send the heart rate data to the server
            queryHartslag = '''
            mutation AddHartslag($hartslag: Int!, $cookie: String!) {
              hartslag(hartslag: $hartslag, cookie: $cookie) {
                code
                message
              }
            }
            '''
            variablesHartslag['hartslag'] = 80  # Set the heart rate value
            variablesHartslag['cookie'] = cookie  # Set the cookie value

            dataHartslag = {'query': queryHartslag, 'variables': variablesHartslag}
            
            response = requests.post(url, headers=headers, data=json.dumps(dataHartslag))
            print(response.json()['data'])

            time.sleep(1)


# Start the thread to send the data
thread = threading.Thread(target=send_data)
thread.start()

# Wait for the thread to finish
thread.join()
