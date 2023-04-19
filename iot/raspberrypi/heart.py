# heartbeat sensor werkt met: https://www.adafruit.com/product/1073

import RPi.GPIO as GPIO
import time

# Set up the GPIO pins
GPIO.setmode(GPIO.BCM)
PulseSensorPin = 2
GPIO.setup(PulseSensorPin, GPIO.IN)

# Set up the PulseSensor
Threshold = 550
Signal = 0

# Main loop
while True:
    # Read the PulseSensor value
    Signal = GPIO.input(PulseSensorPin)
    
    # print signal: signal
    print("Signal: " + str(Signal))
    
    # If the signal is above the threshold, print a message
    if Signal > Threshold:
        print("Heartbeat detected!")
    
