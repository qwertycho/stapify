#ifndef COM_H
#define COM_H

#include <Arduino.h>
#include "logger.h"


// COmmunicatie is een interface voor de logger class.
// Communicatie is een singleton class, zodat er maar 1 instance van is.
// Communicatie is een child class van Logger, zodat de functie sendMessage() geimplementeerd moet worden.
class Communicatie : public Logger{
    // de instellingen voor de communicatie
    private:
        String ssid = "stapifi";
        String pass = "stapifi";
        int serialSpeed = 9600;
// de pointer naar de enige instance van de class, deze word gedeelt als de functie getInstance() wordt aangeroepen
        static Communicatie* instancePTR;
        Communicatie(){}

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
            if(!BLE){
                BLE.begin();
                log(1, "BLE connected");
            }else{
                log(2, "BLE already connected");
            }
        }

    // dit is een functie die moet worden geimplementeerd omdat het een pure virtual functie is in de class Logger
    // oftewel: deze functie maakt Logger werkend.
        void sendMessage(String message){
            Serial.println(message);
        }
};

// de initialisatie van de pointer naar de instance, maakt ding null zodat de functie getInstance() weet dat er nog geen instance is.
Communicatie* Communicatie::instancePTR = nullptr;

#endif