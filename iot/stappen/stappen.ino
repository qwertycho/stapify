#include <Wire.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include "MMA7660.h"
MMA7660 accelerometer;

const char *ssid = "Mutahar";
const char *password = "someGeamers";
WiFiClientSecure client;
HTTPClient http;
const String serverName = "https://www.schoolmoettestdomeinenhebben.nl";
const String url = "/graphql";
int httpsPort = 443;

int steps = 0;

String cookie = "";

void setup()
{
    Serial.begin(9600);

    // Connect to the WiFi network
    http.begin(client, serverName, httpsPort, url);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.println("Connecting to WiFi..");
    }
    Serial.println("Connected to the WiFi network");
    client.setInsecure(); // Bypass SSL certificate verification

    // Initialize the accelerometer
    accelerometer.init();

    // get a cookie from the server
    HTTPClient http;
    http.begin(client, serverName, httpsPort, url);
    String payload = "query { login(username: \"azertycho\", password: \"123\")}";
    http.header("Content-Type", "application/json");
    Serial.println(http.POST(payload));
    
    String response = http.getString();
    Serial.println(response);

    // turn on the built-in LED
    pinMode(LED_BUILTIN, OUTPUT);
    digitalWrite(LED_BUILTIN, HIGH);
    delay(5000);
    digitalWrite(LED_BUILTIN, LOW);
}

void loop()
{
    if (WiFi.status() == WL_CONNECTED)
    {
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

            steps++;

            if (steps == 10)
            {
                // send step to server
                http.POST("mutation{stappen(aantalStappen: 10,cookie: " + cookie + ")}");
                Serial.println("cookie: " + cookie);
                steps = 0;
                Serial.println("10 steps sent to server");
            }

            delay(900); // Delay between each step detection (adjust as needed)
        }
    }
    else
    {
        Serial.println("Error in WiFi connection");
        delay(1000);
    }
}