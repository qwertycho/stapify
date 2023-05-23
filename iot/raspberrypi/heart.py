import time
from machine import Pin
import machine

# Set up GPIO for PulseSensor
PulseSensorPin = machine.ADC(26)

Threshold = 1000


def calculate_average_bpm(beats, duration):
    if duration == 0:
        return 0

    # Calculate average beats per minute
    average_bpm = beats / duration * 60
    return average_bpm


def get_heartbeat():
    # Read the PulseSensor value
    Signal = PulseSensorPin.read_u16()

    # Print signal
    print("Signal: " + str(Signal))

    # If the signal is above the threshold, increment beat count
    if Signal > Threshold:
        print("Heartbeat detected!")
        beats += 1

        # Calculate duration in seconds
        duration = time.time() - start_time

        while Signal > Threshold:
            # wait for the signal to drop below the threshold
            Signal = PulseSensorPin.read_u16()

        # If the duration exceeds a minute, calculate average beats per minute
        if duration >= 60:
            average_bpm = calculate_average_bpm(beats, duration)
            print("Average Beats Per Minute: ", average_bpm)


# Reset variables
start_time = time.time()
beats = 0


while True:
    get_heartbeat()
