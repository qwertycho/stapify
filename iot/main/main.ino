#include "Communicatie.h"
#include "StapTel.h"


// een nieuwe instance van de class Communicatie krijgen
// com is de instance van de class Communicatie
Communicatie* com = Communicatie::getInstance();
StapTel staptel = StapTel();

void setup(){
    com->enableSerial();
    com->log(1, "setup complete");
}

void loop(){
        com->log(1, "test");
        staptel.telStap();
}