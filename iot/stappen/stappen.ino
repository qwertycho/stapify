#include <Wire.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include "MMA7660.h"
#include <ArduinoJson.h>
MMA7660 accelerometer;

// const char *ssid = "Mutahar";
// const char *password = "someGeamers";
const char *ssid = "myPhone";
const char *password = "arthuristhebest";
WiFiClientSecure client;
HTTPClient http;
const String serverName = "https://www.schoolmoettestdomeinenhebben.nl";
const String url = "/graphql";
int httpsPort = 443;

int steps = 0;

String token = "";

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
    http.begin(client, "https://www.schoolmoettestdomeinenhebben.nl/graphql");
    http.addHeader("Content-Type", "application/json");
    String requestBody = "{\"query\":\"query{login(username: \\\"azertycho\\\", password: \\\"123\\\")}\"}";
    int httpResponseCode = http.POST (requestBody); //Send the request
    String response = http.getString (); //Get the response payload
    Serial.println("httpResCode en Response");
    Serial.println (httpResponseCode); //Print HTTP return code
    Serial.println (response); //Print request response payload

    StaticJsonDocument<200> doc;
    deserializeJson(doc, response);
    token = String(doc["data"]["login"]);
    Serial.println("token: " + token);

    http.end();

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
              int aantalStappen = 10;
                // send step to server
                http.begin(client, "https://www.schoolmoettestdomeinenhebben.nl/graphql");
                http.addHeader("Content-Type", "application/json");
                String mutationQuery = "{\"query\": \"mutation { stappen(aantalStappen: " + String(aantalStappen) + ", cookie: \\\"" + token + "\\\") { message code } }\"}";
                Serial.println("Sending mutation request...");
                int httpResponseCodeMutation = http.POST(mutationQuery); // Send the request
                String responseMutation = http.getString(); // Get the response payload
                Serial.println("Response code: " + String(httpResponseCodeMutation));
                Serial.println("Response: " + responseMutation);
                Serial.println(token);

                http.end();
                Serial.println("Mutation request completed");
                steps = 0;
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