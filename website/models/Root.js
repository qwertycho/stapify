var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

const AccountModel = require("../models/Account");
const pool = require("./Database");
const Account = new AccountModel(pool);

var root = {
  accounts: async () => {
    let accounts = await Account.getAccounts();
    console.log(accounts);
    return accounts[0].username;
  },
  account: async ({ username }) => {

    return await Account.getAccount(username);
  },
    login: async ({ username, password }) => {
        return await Account.login(username, password);
    },
    createAccount: async ({ username, password, geboortedatum }) => {
        return await Account.createAccount(username, password, geboortedatum);
    }
};

module.exports = root;