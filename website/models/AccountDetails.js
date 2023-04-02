class accountDetails{
        constructor(accountID, username, geboortedatum, aanmelddatum){
            this.accountID = accountID;
            this.username = username;
            this.geboortedatum = geboortedatum;
            this.aanmelddatum = aanmelddatum;
        }
}

class BMI {
    constructor(bmi, tijd){
        this.bmi = bmi;
        this.tijd = tijd;
    }
}

class Stappen {
    constructor(aantalStappen, tijd){
        this.aantalStappen = aantalStappen;
        this.tijd = tijd;
    }
}

class Hartslag {
    constructor(hartslag, tijd){
        this.hartslag = hartslag;
        this.tijd = tijd;
    }
}

module.exports = {
    accountDetails,
    BMI,
    Stappen,
    Hartslag
}