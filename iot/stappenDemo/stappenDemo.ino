#include <Wire.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include "MMA7660.h"
MMA7660 accelerometer;

const char *ssid = "ssid";
const char *password = "password";

const char *serverName = "http://";

void setup()
{
    Serial.begin(9600);

    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.println("Connecting to WiFi..");
    }
    Serial.println("Connected to the WiFi network");

    accelerometer.init();
    // turn on the built-in LED
    pinMode(LED_BUILTIN, OUTPUT);
    digitalWrite(LED_BUILTIN, HIGH);
}

void loop()
{
    if (WiFi.status() == WL_CONNECTED)
    {
        HTTPClient http;
        http.begin(serverName);
        http.addHeader("Content-Type", "application/x-www-form-urlencoded");

        const int numSamples = 3;     // Number of acceleration samples to consider
        const float threshold1 = 0.8; // Threshold value based on requirements (adjust as needed)
        const float threshold2 = 0.8; // Threshold value based on requirements (adjust as needed)
        const float threshold3 = 0.8; // Threshold value based on requirements (adjust as needed)

        float ax[numSamples], ay[numSamples], az[numSamples];
        bool stepDetected = false;

        for (int i = 0; i < numSamples; i++)
        {
            accelerometer.getAcceleration(&ax[i], &ay[i], &az[i]);
            delay(10); // Delay between each sample (adjust as needed)
        }

        // Check if the acceleration pattern matches a step
        if (ax[0] < threshold1 && ay[1] > -threshold2 && ax[2] > -threshold3)
        {
            stepDetected = true;
        }

        // Print acceleration values
        Serial.print("ax = ");
        for (int i = 0; i < numSamples; i++)
        {
            Serial.print(ax[i]);
            if (i < numSamples - 1)
            {
                Serial.print(", ");
            }
        }
        Serial.println(" m/s^2");

        Serial.print("ay = ");
        for (int i = 0; i < numSamples; i++)
        {
            Serial.print(ay[i]);
            if (i < numSamples - 1)
            {
                Serial.print(", ");
            }
        }
        Serial.println(" m/s^2");

        Serial.print("az = ");
        for (int i = 0; i < numSamples; i++)
        {
            Serial.print(az[i]);
            if (i < numSamples - 1)
            {
                Serial.print(", ");
            }
        }
        Serial.println(" m/s^2");

        if (stepDetected)
        {
            Serial.println("Step detected");

            // send step to server
            // TYCHO PLS HELP WITH GRAPHQL ON ARDUINO

            delay(900); // Delay between each step detection (adjust as needed)
        }

        http.end();
    }
    else
    {
        Serial.println("Error in WiFi connection");
    }
}

// NOTES:
// GET THE ACCELERATION TWICE AND COMPARE IT
// IF THE NEWER ACCELERATION IS HIGHER THAN THE PREVIOUS ONE, THEN STEP +1
// IF THE NEWER ACCELERATION IS LOWER THAN THE PREVIOUS ONE, THEN STEP +0
// IF THE NEWER ACCELERATION IS EQUAL TO THE PREVIOUS ONE, THEN STEP +0