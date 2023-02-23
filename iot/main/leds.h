#ifndef LEDS_H
#define LEDS_H

#include <WiFiNINA.h>

void ledSetup()
{
    pinMode(LEDR, OUTPUT);
    pinMode(LEDG, OUTPUT);
    pinMode(LEDB, OUTPUT);
}

void ledOn(int led)
{
    switch (led)
    {
    case 1:
        digitalWrite(LEDR, HIGH);
        break;
    case 2:
        digitalWrite(LEDG, HIGH);
        break;
    case 3:
        digitalWrite(LEDB, HIGH);
        break;
    default:
        break;
    }
}

void ledOff(int led)
{
    switch (led)
    {
    case 1:
        digitalWrite(LEDR, LOW);
        break;
    case 2:
        digitalWrite(LEDG, LOW);
        break;
    case 3:
        digitalWrite(LEDB, LOW);
        break;
    default:
        break;
    }
}

#endif