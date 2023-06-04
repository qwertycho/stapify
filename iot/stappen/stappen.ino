#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include "MMA7660.h"
#include <Wire.h>
MMA7660 accelemeter;

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
    accelemeter.init();
    accelemeter.setMode(MMA7660_STAND_BY);
    accelemeter.setSampleRate(120);
    accelemeter.setMode(MMA7660_ACTIVE);
}

void loop()
{
    if (WiFi.status() == WL_CONNECTED)
    {
        HTTPClient http;
        http.begin(serverName);
        http.addHeader("Content-Type", "application/x-www-form-urlencoded");

        http.end();
    }
    else
    {
        Serial.println("Error in WiFi connection");
    }
}