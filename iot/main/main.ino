#include "Communicatie.h"


// een nieuwe instance van de class Communicatie krijgen
// com is de instance van de class Communicatie
Communicatie* com = Communicatie::getInstance();

void setup(){
    com->enableSerial();
    com->log(1, "setup complete");
}

void loop(){
        com->log(1, "test");
}