#ifndef COM_H
#define COM_H

#include <Arduino.h>
#include "logger.h"
#include "Buffer.h"
#include <ArduinoBLE.h>


// COmmunicatie is een interface voor de logger class.
// Communicatie is een singleton class, zodat er maar 1 instance van is.
// Communicatie is een child class van Logger, zodat de functie sendMessage() geimplementeerd moet worden.
class Communicatie : public Logger{
    // de instellingen voor de communicatie
    private:
        BLEService service = "19B10000-E8F2-537E-4F6C-D104768A1214";
        String ssid = "stapifi";
        String pass = "stapifi";
        int serialSpeed = 9600;
        ComBuffer buffer; 

// de pointer naar de enige instance van de class, deze word gedeelt als de functie getInstance() wordt aangeroepen
        static Communicatie* instancePTR;
        Communicatie(){
            buffer = ComBuffer();
        }

    public:

        // Het contructor gedeelte van de singleton pattern

        // de destructor
        Communicatie(const Communicatie &obj) = delete;

        // de functie om de instance te krijgen
        static Communicatie* getInstance(){
            if(instancePTR == nullptr){
                instancePTR = new Communicatie();
            }
            return instancePTR;
        }

        // de functies

        // de functie om een serial verbinding te maken
        // de functie moet controleren of er al een verbinding is zodat er geen fouten ontstaan
        void enableSerial(){
            if(!Serial){
                Serial.begin(serialSpeed);
                log(1, "Serial connected with speed: " + serialSpeed);
            }else{
                log(2, "Serial already connected with speed: " + serialSpeed);
            }
        }

    // start een bluetooth verbinding
    // controleerd eerst of er al een verbinding is
    // voor bluetooth is de library nodig: arduinoBLE
        void enableBLE(){
            if(!BLE.begin()){
                log(3, "BLE failed to start");
            }else{
                // voor wat voor reden dan ook wilt setLocalName() een char* hebben en geen String
                BLE.setLocalName("Staptor");
                BLE.setAdvertisedService(service);
                BLE.addService(service);
                BLE.advertise();
                log(1, "BLE started");
            }
        }
        
        void getDevice(){
            BLEDevice tellie = BLE.central();
        }

        bool isEven(String& message){
            bool isEven = (message.length() % 2 == 0);
            return isEven;
        }
        
        void sendMessage(String type ,String message){
            String msgType = "[" + type + "] ";
            Serial.println(msgType + message + " ," + isEven(message) + ";");
        }

    // dit is een functie die moet worden geimplementeerd omdat het een pure virtual functie is in de class Logger
    // oftewel: deze functie maakt Logger werkend.
        void sendLog(String message){
            bool isEven = (message.length() % 2 == 0);
            Serial.println("[LOG] " + message + " ," + isEven + ";");
        }
};

// de initialisatie van de pointer naar de instance, maakt ding null zodat de functie getInstance() weet dat er nog geen instance is.
Communicatie* Communicatie::instancePTR = nullptr;

#endif