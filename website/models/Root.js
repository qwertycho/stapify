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

  cookie: async ({ cookie }) => {
    let account = await Account.checkCookie(cookie);
    if (account) {
      return true;
    } else {
      return false;
    }
  },

  stappen: async ({ aantalStappen, cookie }) => {
    try {
      let succes = await Sensor.insertStappen(aantalStappen, cookie);
      if (succes) {
        return { code: 200, message: "Stappen toegevoegd" };
      } else {
        return { code: 500, message: "Inlog fout" };
      }
    } catch (err) {
      return { code: 500, message: err };
    }
  },

  stapRange: async ({ start, end, cookie }) => {
    return await Sensor.getStapRange(start, end, cookie);
  },

  bmi: async ({ bmi, cookie }) => {
    try {
      let succes = await Sensor.insertBMI(bmi, cookie);
      if (succes) {
        return { code: 200, message: "BMI toegevoegd" };
      } else {
        return { code: 500, message: "Inlog fout" };
      }
    } catch (err) {
      return { code: 500, message: err };
    }
  },

  lengte: async ({ lengte, cookie }) => {
    try {
      let succes = await Sensor.insertLengte(lengte, cookie);
      if (succes) {
        return { code: 200, message: "Lengte toegevoegd" };
      } else {
        return { code: 500, message: "Inlog fout" };
      }
    } catch (err) {
      return { code: 500, message: err };
    }
  },

  hartslag: async ({ hartslag, cookie }) => {
    try {
      let succes = await Sensor.insertHartslag(hartslag, cookie);
      if (succes) {
        return { code: 200, message: "Hartslag toegevoegd" };
      } else {
        return { code: 500, message: "Inlog fout" };
      }
    } catch (err) {
      return { code: 500, message: err };
    } 
  },

  sport: async ({ sportID }) => {
    return await Sensor.getSport(sportID);
  },

  sportSchema: async ({ sportSchema, cookie }) => {
    try {
      let succes = await Account.insertSportSchema(cookie, sportSchema);
      if (succes) {
        return { code: 200, message: "Sport schema toegevoegd" };
      } else {
        return { code: 500, message: "Inlog fout" };
      }
    } catch (err) {
      return { code: 500, message: err };
    }
  },

  eetSchema: async ({ eetSchema, cookie }) => {
    try {
      let succes = await Account.insertEetSchema(cookie, eetSchema);
      if (succes) {
        return { code: 200, message: "Eet schema toegevoegd" };
      } else {
        return { code: 500, message: "Inlog fout" };
      }
    } catch (err) {
      return { code: 500, message: err };
    }
  },

};

module.exports = root;
