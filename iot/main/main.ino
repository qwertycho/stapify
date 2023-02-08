#include "logger.h"

// een nieuwe instance van de class Logger krijgen
Logger* logger = Logger::getInstance(1);

void setup(){
    Serial.begin(9600);
}

void loop(){
    logger->log(1, "test");

    delay(1000);
}