#include <Wire.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

unsigned long current;
unsigned long last = millis();

int bpm;

void setup()
{
    Serial.begin(9600);

    // turn on the built-in LED
    pinMode(LED_BUILTIN, OUTPUT);
    digitalWrite(LED_BUILTIN, HIGH);
    delay(5000);
    digitalWrite(LED_BUILTIN, LOW);
}

void loop()
{
    // get the hartrate
    int sensorValue = analogRead(A0);

    if (sensorValue)
    {
        Serial.println(sensorValue);
    }
}