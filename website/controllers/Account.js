const AccountModel = require('../models/Account');

class AccountDetails{
    username = "";
    accountID = "";
    geboortedatum = "";
    aanmelddatum = "";
}

class AccountController{
    constructor(pool){
        this.model = new AccountModel(pool);
        this.accountDetails = new AccountDetails();
    }

    async getAccount(id){
        let accountDetails = await this.model.getAccount(id);
        this.accountDetails.username = accountDetails[0].username;
        this.accountDetails.accountID = accountDetails[0].accountID;
        this.accountDetails.geboortedatum = accountDetails[0].geboortedatum;
        this.accountDetails.aanmelddatum = accountDetails[0].aanmelddatum;

        return this.accountDetails;
    }

    async login(username, password){
        return await this.model.login(username, password);
    }
}

module.exports = AccountController;
