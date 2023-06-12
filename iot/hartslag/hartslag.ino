#include <Wire.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

const char *ssid = "Mutahar";
const char *password = "someGeamers";
WiFiClientSecure client;
HTTPClient http;
const char *serverName = "https://schoolmoettestdomeinenhebben.nl/";
const char *url = "/graphql";
int httpsPort = 443;

unsigned long current;
unsigned long last = millis();

int bpm;

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

    // get a cookie from the server
    HTTPClient http;
    http.begin(client, serverName, httpsPort, url);
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    http.POST("query { login(username: \"azertycho\", password: \"123\")}");
    const char *cookie = http.getString().c_str();

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
        // get the hartrate
        int sensorValue = analogRead(A0);
        int temp;

        if (sensorValue > 550)
        {
            current = millis();
            Serial.println(60000 / (current - last));
            last = millis();
        }

        while (analogRead(A0) > 550)
        {
            current = millis();
            temp = analogRead(A0);
        }

        if (temp > 550)
        {
            bpm = 60000 / (current - last);
            Serial.println("je bpm is: " + String(bpm));
            last = millis();

            http.POST("mutation { hartslag(hartslag: \"bpm\", cookie: \"cookie\") }");
        }
    }
    else
    {
        Serial.println("Error in WiFi connection");
        delay(1000);
    }
}