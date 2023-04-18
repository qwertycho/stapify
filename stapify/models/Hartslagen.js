export default class HartModel {
    lowHartCount = [
    "Je bent lekker rustig",
    "Probeer eens wat meer te bewegen",
    "Je hebt een rustig hart"
    ];

    mediumHartCount = [
    "Je hartslag is goed",
    "Je bent lekker bezig",
    "Je bent gezond bezig"
    ];

    highHartCount = [
    "Je hartslag is hoog",
    "je bent sportief bezig",
    "Vergeet niet af en toe te rusten"
    ];

    veryHighHartCount = [
        "Je hartslag is te hoog!",
        "Neem nu een pauze",
        "Denk aan je hart"
    ];
/**
 * 
 * @param {*} HartCount 
 * @returns een random bericht voor de stappen
 */
    getHartMessage(HartCount) {
        if(HartCount < 50) {
            return this.lowHartCount[Math.floor(Math.random() * this.lowHartCount.length)];
        } else if(HartCount < 81) {
            return this.mediumHartCount[Math.floor(Math.random() * this.mediumHartCount.length)];
        } else if(HartCount < 120) {
            return this.highHartCount[Math.floor(Math.random() * this.highHartCount.length)];
        } else if(HartCount < 160) {
            return this.veryHighHartCount[Math.floor(Math.random() * this.veryHighHartCount.length)];
        } else{
            return this.veryHighHartCount[Math.floor(Math.random() * this.veryHighHartCount.length)];
        }
    }
}