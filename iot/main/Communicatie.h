#ifndef COM_H
#define COM_H

#include <Arduino.h>
#include "logger.h"

class Communicatie{
    private:
        String ssid = "stapifi";
        String pass = "stapifi";
        u_int8_t serialSpeed = 9600;
        Logger logger;

    public:
        Communicatie(const Logger &logger){
            logger = logger;
        }

        void setSerialSpeed(u_int8_t speed){
            serialSpeed = speed;
            closeSerial();
            connectSerial(serialSpeed);
        }

        void createWifi();



        void connectBluetooth();

        void connectSerial(u_int8_t serialSpeed);){
            Serial.begin(serialSpeed);
        }

        void closeSerial(){
            Serial.end();
        }
}