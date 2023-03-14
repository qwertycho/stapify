
#ifndef LOG_h
#define LOG_h
#include <Arduino.h>
#include "leds.h"
// de class Logger is er om alleen bepaalde informatie te loggen en om als enkel punt te dienen voor het loggen van informatie
class Logger
{
private:
  u_int8_t logLevel = 0;

  // Maakt een string met de juiste informatie voor de log
  String getInfoMessage(u_int8_t logLevel, String message)
  {
    String infoMessage = "";
    switch (logLevel)
    {
    case 1:
      infoMessage = "INFO: ";
      ledOn(1);
      break;
    case 2:
      infoMessage = "WARNING: ";
      ledOn(2);
      break;
    case 3:
      infoMessage = "ERROR: ";
      ledOn(3);
      break;
    default:
      infoMessage = "UNKNOWN: ";
      break;
    }
    infoMessage += message;
    return infoMessage;
  }

public:
  void setLevel(u_int8_t logLevel)
  {
    this->logLevel = logLevel;
  }

  virtual void sendLog(String message) = 0;

  // Ontvangt een logniveau en een bericht
  // Als het logniveau hoger is dan het logniveau van de logger wordt het bericht geprint
  void log(u_int8_t logLevel, String message)
  {
    if (logLevel >= this->logLevel)
    {
      if (Serial)
      {
        // Serial.println(getInfoMessage(logLevel, message));
        sendLog(getInfoMessage(logLevel, message));
      }
    }
  }
};

#endif