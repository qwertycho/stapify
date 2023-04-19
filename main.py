import machine
import time

# Set up the ADC
adc = machine.ADC(0)

# Set up the PulseSensor
Threshold = 550
Signal = 0

# Main loop
while True:
    # Read the analog value
    analog_value = adc.read_u16()
    print("Analog value: " + str(analog_value))
    # Convert the analog value to a digital value
    Signal = 1 if analog_value > Threshold else 0
    
    # print signal: signal
    # print("Signal: " + str(Signal))
    
    # If the signal is 1, print a message
    # if Signal == 1:
        # print("Heartbeat detected!")

    time.sleep(0.5)
