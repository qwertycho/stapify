// Gebruik de class door #include "logger.h" te gebruiken in de .ino file
// Daarna kan je een niewe logger aanmaken met {class} {naam}(logLevel), Logger logger(1);
// Daarna kunnen berichten worden geprint met {naam}.log(logLevel, "message"), logger.log(1, "message");

#ifndef LOG_h
#define LOG_h

// de class Logger is er om alleen bepaalde informatie te loggen en om als enkel punt te dienen voor het loggen van informatie
// het maakt gebruik van de singleton pattern om ervoor te zorgen dat er maar 1 instance logger is
class Logger {

  private:
    u_int8_t logLevel = 0;

    static Logger*

// pointer naar de enige instance van de class
    instancePTR;

    Logger(u_int8_t logLevel) {
      this->logLevel = logLevel;
    }

// Maakt een string met de juiste informatie voor de log
    String getInfoMessage(u_int8_t logLevel, String message) {
      String infoMessage = "";
      switch (logLevel) {
        case 1:
          infoMessage = "INFO: ";
          break;
        case 2:
          infoMessage = "WARNING: ";
          break;
        case 3:
          infoMessage = "ERROR: ";
          break;
        default:
          infoMessage = "UNKNOWN: ";
          break;
      }
      infoMessage += message;
      return infoMessage;
    }

  public:

    Logger(const Logger &obj) = delete;

// de functie die moet worden aangesproken om een instance van de class te krijgen
// deze zorgt ervoor dat er maar 1 instance is
    static Logger* getInstance(u_int8_t logLevel) {
      if (instancePTR == nullptr) {
        instancePTR = new Logger(logLevel);
      }
      return instancePTR;
    }

    void setLevel(u_int8_t logLevel) {
      this->logLevel = logLevel;
    }

// Ontvangt een logniveau en een bericht
// Als het logniveau hoger is dan het logniveau van de logger wordt het bericht geprint
// Als de logger geen Serial heeft wordt er niks geprint
// Later moet dit afhankelijk zijn van de Communicator class
    void log(u_int8_t logLevel, String message) {
      if (logLevel >= this->logLevel) {
        if(Serial){
          Serial.println(getInfoMessage(logLevel, message));
        }
      }
      }

}; 

Logger* Logger::instancePTR = nullptr;


#endif
