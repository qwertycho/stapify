#include <Arduino_LSM6DSOX.h>
#include "Communicatie.h"

class StapTel {

    private:
        Communicatie* com = Communicatie::getInstance();
        float x, y, z;

        void readAcceleration() {
            if (IMU.accelerationAvailable()) {
                IMU.readAcceleration(x, y, z);
            }
        }

    public:
        int staptel = 0;

        void getStappen() {
            // verstuur stappen naar de server / tellie
        }

        void setStappen() {
            // ontvang stappen van de server / tellie
        }
        
        void telStap() {
            readAcceleration();

            float length = sqrt(x*x + y*y + z*z);
            if (length > 2) {
                com->log(1, "stap");
                staptel++;
            }
        }
};
