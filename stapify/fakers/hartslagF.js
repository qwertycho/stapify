/**
 * @file HartslagF.js
 * HartslagF.js is een fake hartslag sensor die een random getal tussen de -10 en 10 optelt bij de hartslag.
 */
class HartslagFaker{

    // de mogelijke callbacks die zijn aangemeld
    callbacks = [];

    constructor(){
        this.hartslag = 60;
    }

    /**
     * Deze functie simulateert een hartslag sensor
     * @memberof HartslagFaker
     * @example hartslagF.start();
     * Deze funcite start een interval die elke seconde een random getal tussen de -10 en 10 optelt bij de hartslag
     * en deze opslaat in de hartslag variabele.
     * Als de hartslag onder de 40 komt, dan wordt deze op 40 gezet.
     * Als de hartslag boven de 100 komt, dan wordt deze op 100 gezet.
     * Als de hartslag veranderd, dan worden alle callbacks aangeroepen.
     */
    start(){
        this.Interval = setInterval(() => {
            // genereer een random getal tussen de -10 en 10
            let random = Math.floor(Math.random() * 10) - 5;
            // voeg het random getal toe aan de hartslag
            this.hartslag += random;
            if(this.hartslag < 40){
                this.hartslag = 40;
            }else if(this.hartslag > 100){
                this.hartslag = 100;
            }
            this.callCallBacks();
        }, 1000);
    }

    /**
     * Met deze functie kun je een callback aanmelden voor een event
     * @param {string} event - de naam van het event
     * @param {eventCallback} callback - de callback functie
     * @memberof HartslagFaker
     * @example hartslagF.on("hartslag", (hartslag) => {code});
     * @callback eventCallback
     * @param {number} hartslag - de huidige hartslag
    */
    on(event, callback){
        if(event === "hartslag"){
            this.callbacks.push(callback);
        }
    }

    /**
     * Deze functie roept alle callbacks aan
     * Alleen voor intern gebruik 
    */
    callCallBacks(){
        this.callbacks.forEach(callback => {
            callback(this.hartslag);
        });
    }

    /**
     * Deze functie geeft de huidige hartslag terug
     * @returns {number} de huidige hartslag
     * @memberof HartslagFaker
    */
    getHartslag(){
        return this.hartslag;
    }
}

module.exports = new HartslagFaker();