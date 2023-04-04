export default class StapModel {
    lowStepCount = [
    "Neem eens een goede wandeling",
    "De hele dag zitten is niet goed voor je",
    "Ga eens een rondje lopen"
    ];

    mediumStepCount = [
    "Je bent al goed op weg",
    "Wandelen is goed voor je",
    "Ga eens een rondje lopen"
    ];

    highStepCount = [
    "Je bent al heel goed op weg",
    "Jij bent een echte sporter",
    "Jij bent gezond bezig"
    ];

    veryHighStepCount = [
        "Vergeet niet om te drinken",
        "Bezig met een marathon?",
        "Even een pauze nemen"
    ];
/**
 * 
 * @param {*} stepCount 
 * @returns een random bericht voor de stappen
 */
    getStepMessage(stepCount) {
        if(stepCount < 1000) {
            return this.lowStepCount[Math.floor(Math.random() * this.lowStepCount.length)];
        } else if(stepCount < 5000) {
            return this.mediumStepCount[Math.floor(Math.random() * this.mediumStepCount.length)];
        } else if(stepCount < 10000) {
            return this.highStepCount[Math.floor(Math.random() * this.highStepCount.length)];
        } else if(stepCount < 15000) {
            return this.veryHighStepCount[Math.floor(Math.random() * this.veryHighStepCount.length)];
        } else{
            return this.veryHighStepCount[Math.floor(Math.random() * this.veryHighStepCount.length)];
        }
    }
}