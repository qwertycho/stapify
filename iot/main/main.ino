#include "Communicatie.h"
//#include "StapTel.h"

// een nieuwe instance van de class Communicatie krijgen// com is de instance van de class Communicatie
Communicatie* com = Communicatie::getInstance();
//StapTel staptel = StapTel();

void setup()
{
   // ledSetup();
    com->enableSerial();
}

void loop()
{
    Serial.println("HIJ DOET HET");
    // tijd->tick();
    com->sendMessage("ding","test");
    //    staptel.telStap();
}
