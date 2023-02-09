#ifndef COM_H
#define COM_H

#include <Arduino.h>
#include "logger.h"

class Communicator{
    private:
        String ssid = "Stapwifi";
        String password = "Stapwifi";
        String name = "Staptor";
        u_int8_t buadRate = 9600;

        // Logger* = mooie interfacce voor logger (momenteel niks omdat circular dependency)
        // comBuffer = buffer voor communicatie (later)

        static Communicator*

        instancePtr;

        Communicator(){}

        void setupSerial(){
            Serial.begin(buadRate);
        }

        void checkSerial(){
            if(!Serial){
                setupSerial();
            }
        }


    public:
        Communicator(const Communicator &obj) = delete;

        static Communicator* getInstance(){
            if(instancePtr == nullptr){
                instancePtr = new Communicator();
            }
            return instancePtr;
        }

        void sendSerial(String message){
            // stuur naar buffer
            checkSerial();
            // heel de buffer stuurt naar serial (later)
            Serial.println(message);
            // buffer leegmaken (later)
        }

        void sendBluetooth(String message){
            // stuur naar buffer
            // heel de buffer stuurt naar bluetooth (later)
            // buffer leegmaken (later)
        }


};