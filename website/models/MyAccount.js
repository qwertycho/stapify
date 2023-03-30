const accountDetails = require('./AccountDetails');

class MyAccountDetails{
        constructor(
            accountID, 
            username, 
            geboortedatum, 
            aanmelddatum,
            stappen,
            bmi,
            sportSchema
            ){
            this.accountID = accountID;
            this.username = username;
            this.geboortedatum = geboortedatum;
            this.aanmelddatum = aanmelddatum;
            this.stappen = stappen;
            this.bmi = bmi;
            this.sportSchema = sportSchema;
        }
}

module.exports = MyAccountDetails;