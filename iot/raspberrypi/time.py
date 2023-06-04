import time


def getTime():
    start_time = time.time()
    duration = time.time() - start_time
    return duration


while True:
    print(getTime())
