var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

const AccountModel = require("../models/Account");
const pool = require("./Database");
const Account = new AccountModel(pool);

const express = require("express");
const app = express();

var root = {
  accounts: async () => {
    let accounts = await Account.getAccounts();
    console.log(accounts);
    return accounts;
  },
  account: async ({ username }) => {

    return await Account.getAccount(username);
  },
    login: async ({ username, password }) => {
        if(await Account.login(username, password)){
          return await Account.createCookie(username);
        } else {
          return false;
        }
    },
    createAccount: async ({ username, password, geboortedatum }) => {
        return await Account.createAccount(username, password, geboortedatum);
    }
};

module.exports = root;