import hartslagF, { hartslag } from "../fakers/hartslagF";
import HartslagDisplay from "../components/HartslagComponent";

/**
 * De hartslag klasse houd alles bij over de hartslag
 * @class Hartslag
 * @example const hartslag = Hartslag.getHartslag();
 * @memberof stapify/models
*/
class Hartslag {

    hartslag = 69;
    // Datastream is een aparte klasse die de hartslag ophaalt
    dataStream = hartslagF;
    /**
     * De hartslag display is een aparte component die de hartslag weergeeft
     * @type {React.Component}
     * @memberof Hartslag
     * @example <Hartslag.HartslagDisplay />
     */
    HartslagDisplay = HartslagDisplay;

    constructor() {
        // we starten de datastream zodat deze begint met werken
        this.dataStream.start();
        // we luisteren naar de hartslag event
        this.dataStream.on("hartslag", (hartslag) => {
            // als er een hartslag event is, dan updaten we de hartslag
            this.updateHartslag(hartslag);
        });
    }

    // interne functie voor het updaten van de hartslag
    updateHartslag(hartslag) {
        this.hartslag  = hartslag;
    }

    /**
     * Deze functie geeft de huidige hartslag terug
     * @returns {number} de huidige hartslag
     * @memberof Hartslag
     * @example
     * const hartslag = Hartslag.getHartslag();
     */
    getHartslag() {
        return this.hartslag;
    }
}

/**
 * De hartslag klasse houd alles bij over de hartslag
 * @class Hartslag
 *  @example const hartslag = Hartslag.getHartslag();
 * @memberof stapify/models
 * @type {Hartslag}
 */
export default new Hartslag();