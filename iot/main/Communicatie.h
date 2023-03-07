#ifndef COM_H
#define COM_H

#include <Arduino.h>
#include "logger.h"
#include "Buffer.h"
#include <ArduinoBLE.h>

/**
 * @brief De Communicatie class is een singleton class die de communicatie met de buitenwereld regelt.
 * Krijg een nieuwe instance van de class met de functie getInstance().
 * @details De class heeft een buffer die de berichten opslaat en een functie om berichten te versturen.
 */
class Communicatie : public Logger
{
    // de instellingen voor de communicatie
private:
    BLEService service = "19B10000-E8F2-537E-4F6C-D104768A1214";
    String ssid = "stapifi";
    String pass = "stapifi";
    int serialSpeed = 9600;
    ComBuffer buffer;
    bool needFeedback = false; //of de communicatie een feedback nodig heeft van de ontvanger

    // de pointer naar de enige instance van de class, deze word gedeelt als de functie getInstance() wordt aangeroepen
    static Communicatie *instancePTR;
    Communicatie()
    {
        buffer = ComBuffer();
    }

public:
    // Het contructor gedeelte van de singleton pattern

    // de destructor
    Communicatie(const Communicatie &obj) = delete;

    /**
     * @brief De functie om de instance van de class te krijgen.
     * @return Communicatie* de instance van de class
     */
    static Communicatie *getInstance()
    {
        if (instancePTR == nullptr)
        {
            instancePTR = new Communicatie();
        }
        return instancePTR;
    }

    /**
     * @brief De functie om de serial verbinding te starten.
     * @details Controleerd eerst of er al een verbinding is.
     */
    void enableSerial()
    {
        if (!Serial)
        {
            Serial.begin(serialSpeed);
            log(1, "Serial connected with speed: " + serialSpeed);
        }
        else
        {
            log(2, "Serial already connected with speed: " + serialSpeed);
        }
    }

    /**
     * @brief De functie om de BLE verbinding te starten.
     * @details Controleerd eerst of er al een verbinding is.
     */
    void enableBLE()
    {
        if (!BLE.begin())
        {
            log(3, "BLE failed to start");
        }
        else
        {
            BLEStringCharacteristic fileNameCharacteristic("2D2F88C4-F244-5A80-21F1-EE0224E80658", BLERead | BLEWrite, 20 );
            // voor wat voor reden dan ook wilt setLocalName() een char* hebben en geen String
            BLE.setLocalName("Staptor");
            service.addCharacteristic(fileNameCharacteristic);

            BLE.setAdvertisedService(service);
            BLE.addService(service);
            BLE.advertise();


            log(1, "BLE started");
        }
    }

    /**
     * @brief Suurt het verbonden device terug
     * @details Deze functie is nog niet af.
     * @todo Deze functie moet nog worden afgemaakt.
     * @return BLEDevice het verbonden device
     */
    void getDevice()
    {
        BLEDevice tellie = BLE.central();
    }

    /**
     * @brief Interne functie voor het checken of een bericht even lang is.
     * @param String bericht
     * @return bool true als het bericht even lang is
     */
    bool isEven(String &message)
    {
        bool isEven = (message.length() % 2 == 0);
        return isEven;
    }

    /**
     * @brief De functie om een bericht te versturen.
     * @details Deze functie stuurt een bericht naar de serial verbinding.
     * @param String type het type bericht
     * @param String message het bericht
     */
    void sendMessage(String type, String message)
    {
        String msgType = "[" + type + "] ";
        Serial.println(msgType + message + " ," + isEven(message) + ";");
    }

    /**
     * @brief De functie om een log te versturen.
     * @details Deze functie stuurt een bericht naar de serial verbinding.
     * @param String message het bericht
     */
    void sendLog(String message)
    {
        bool isEven = (message.length() % 2 == 0);
        Serial.println("[LOG] " + message + " ," + isEven + ";");
    }

    /**
     * @brief test functie om data in de buffer op te slaan 
     * @details Deze functie slaat message op in de buffer
     * @param String message het bericht
     */
    void addBuffer(String message)
    {
        buffer.saveData(message);
    }

    /**
     * @brief Stuur alle data in de buffer naar de serial verbinding
     * @details Deze functie stuurt de data in de buffer naar de serial verbinding
     * @return bool true als het is gelukt
     */
    bool sendBuffer()
    {
        for (int i = 0; i < buffer.getLength(); i++)
        {
            Serial.println(buffer.getData()[i]);
        }
        return true;
    }

    BLEService getService(){
        return service;
    }

    BLEStringCharacteristic getCharacteristic(){
        return BLEStringCharacteristic("2D2F88C4-F244-5A80-21F1-EE0224E80658", BLERead | BLEWrite, 20 ); 
    }
    
};

// de initialisatie van de pointer naar de instance, maakt ding null zodat de functie getInstance() weet dat er nog geen instance is.
Communicatie *Communicatie::instancePTR = nullptr;

#endif