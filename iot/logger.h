// Gebruik de class door #include "logger.h" te gebruiken in de .ino file
// Daarna kan je een niewe logger aanmaken met {class} {naam}(logLevel), Logger logger(1);
// Daarna kunnen berichten worden geprint met {naam}.log(logLevel, "message"), logger.log(1, "message");

#ifndef LOG_h
#define LOG_h

// de class Logger is er om alleen bepaalde informatie te loggen en om als enkel punt te dienen voor het loggen van informatie
class Logger {
  private:
    int logLevel;

  public:
    Logger(int level) {
      logLevel = level;
    }

// het logLevel kan worden aangepast met deze functie om te helpen met debuggen
    void setLevel(int level) {
      logLevel = level;
      logMessage("Logger: logLevel set to " + String(level));
    }

// Het bericht word gecontroleerd op logLevel. Alleen als het bericht hetzelfde of hoger is dan het logLevel word het bericht geprint.
    void log(int level, String message) {
      if (level >= logLevel) {
        if (level == 1) {
          message = "INFO: " + message;
        }
        if (level == 2) {
          message = "WARNING: " + message;
        }
        if (level == 3) {
          message = "ERROR: " + message;
        }
        logMessage(message);
      }
    }

// Hier word het bericht geprint als er een seriële verbinding is.
// Dit moet ook voor bluetooth worden gedaan zodat er op verschillende manieren informatie kan worden geprint.
    void logMessage(String message){
      if(Serial){
        Serial.println(message);
      }
    }
};

#endif
