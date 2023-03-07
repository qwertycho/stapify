#ifndef TIJD_H
#define TIJD_H
#include <Arduino.h>
#include <arduino-timer.h>
#include <vector>

/**
 * @brief De struct voor de callback functie.
 * @details De struct bevat een pointer naar de callback functie en een string met de type van de callback.
*/
struct callbackStruct
{
    void (*callback)();
    String type;
};
/**
 * @brief De Tijd class is een singleton class die een timer heeft die elke seconde een callback aanroept.
 * Voor deze class is de library arduino-timer nodig. 
*/
class Tijd
{
private:
    static Tijd *instance;
    Timer<1000> itimer;

    /**
     * @brief De functie die elke seconde wordt aangeroepen.
     * @param optioneel args (niks dus)
     * @return bool true
    */
    static bool onSeconde(void *args)
    {
        Serial.println("seconde");
        Tijd::getInstance()->seconde();
        return true;
    }

    Tijd()
    {
        itimer.every(1000, onSeconde);
    }

    std::vector<callbackStruct> callbacks;

public:

    /**
     * @brief De functie om de instance van de class te krijgen.
     * @return Tijd* de instance van de class
     * @details Als er nog geen instance is, maak er dan een aan.
    */
    static Tijd *getInstance()
    {
        if (instance == nullptr)
        {
            instance = new Tijd();
        }
        return instance;
    }

    /**
     * @brief De functie om de timer te laten ticken.
     * @details Deze functie moet elke loop worden aangeroepen. 
     * Zie https://github.com/contrem/arduino-timer
    */
    void tick()
    {
        itimer.tick();
    }

    /**
     * @brief De functie om een callback toe te voegen.
     * @param String type de type van de callback, seconde, minuut, uur
     * @param void (*callback)() de callback functie
     * @details De type van de callback is een string, zodat je meerdere callbacks van hetzelfde type kan toevoegen.
     * De callback functie moet geen parameters hebben.
    */
    void on(String type, void (*callback)())
    {
        callbackStruct callbackStruct;
        callbackStruct.callback = callback;
        callbackStruct.type = type;
        callbacks.push_back(callbackStruct);
    }

    /**
     * @brief De functie die elke seconde wordt aangeroepen.
     * @return bool true
     * @details Deze functie roept alle callbacks aan die van het type seconde zijn.
    */
    bool seconde()
    {
        for (int i = 0; i < callbacks.size(); i++)
        {
            if (callbacks[i].type == "seconde")
            {
                callbacks[i].callback();
            }
        }
        return true;
    }
};

Tijd *Tijd::instance = nullptr;

#endif