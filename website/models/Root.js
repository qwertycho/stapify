var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

const AccountModel = require("../models/Account");
const SensorModel = require("../models/SensorModel");
const pool = require("./Database");
const Account = new AccountModel(pool);
const Sensor = new SensorModel(pool);

var root = {
  accounts: async () => {
    return await Account.getAccounts();
  },
  account: async ({ username }) => {
    return await Account.getAccount(username);
  },
  login: async ({ username, password }) => {
    return await Account.login(username, password);
  },
  createAccount: async ({ username, password, geboortedatum }) => {
    return await Account.createAccount(username, password, geboortedatum);
  },


  myAccount: async ({ cookie }) => {
    return await Account.getMyAccount(cookie);
  },

  stappen: async ({aantalStappen, cookie }) => {
    try{
      let succes = await Sensor.insertStappen(aantalStappen, cookie);
      if(succes){
        return {code: 200, message: "Stappen toegevoegd"};
      }else{
        return {code: 500, message: "Inlog fout"};
      }
    }catch(err){
      return {code: 500, message: err};
    }
  },

  bmi: async ({bmi, cookie }) => {
    try{
      let succes = await Sensor.insertBMI(bmi, cookie);
      if(succes){
        return {code: 200, message: "BMI toegevoegd"};
      }else{
        return {code: 500, message: "Inlog fout"};
      }
    }catch(err){
      return {code: 500, message: err};
    }
  }
};

module.exports = root;
