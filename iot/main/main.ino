#include "leds.h"
#include "Tijd.h"

#include "Communicatie.h"
#include "StapTel.h"

// een nieuwe instance van de class Communicatie krijgen
// com is de instance van de class Communicatie
Communicatie* com = Communicatie::getInstance();
Tijd* tijd = Tijd::getInstance();
StapTel staptel = StapTel();

void setup()
{
    ledSetup();
    com->enableSerial();
}

void loop()
{
    tijd->tick();
    tijd->on();
    com->sendMessage("ding","test");
        staptel.telStap();
}