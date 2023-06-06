var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

const AccountModel = require("../models/Account");
const SensorModel = require("../models/SensorModel");
const pool = require("./Database");
const Account = new AccountModel(pool);
const Sensor = new SensorModel(pool);

var root = {
  accounts: async () => {
    try {
      return await Account.getAccounts();
    } catch (err) {
      return { code: 500, message: err };
    }
  },
  account: async ({ username }) => {
    try {
      return await Account.getAccount(username);
    } catch (err) {
      return { code: 500, message: err };
    }
  },
  login: async ({ username, password }) => {
    try {
      return await Account.login(username, password);
    } catch (err) {
      return { code: 500, message: err };
    }
  },

  createAccount: async ({ username, password, geboortedatum }) => {
    try {
      return await Account.createAccount(username, password, geboortedatum);
    } catch (err) {
      return err;
    }
  },

  myAccount: async ({ cookie }) => {
    try {
      return await Account.getMyAccount(cookie);
    } catch (err) {
      return { code: 500, message: err };
    }
  },

  cookie: async ({ cookie }) => {
    try {
      return await Account.checkCookie(cookie);
    } catch (err) {
      return { code: 500, message: err };
    }
  },

  stappen: async ({ aantalStappen, cookie }) => {
    try {
      let succes = await Sensor.insertStappen(aantalStappen, cookie);
      return { code: 200, message: "Stappen toegevoegd" };
    } catch (err) {
      return { code: 500, message: err };
    }
  },

  stapRange: async ({ start, end, cookie }) => {
    try {
      return await Sensor.getStapRange(start, end, cookie);
    } catch (err) {
      return [{ code: 500, message: err }];
    }
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
      await Sensor.insertHartslag(hartslag, cookie);
      return { code: 200, message: "Hartslag toegevoegd" };
    } catch (err) {
      return { code: 500, message: err };
    }
  },

  hartRange: async ({ start, end, cookie }) => {
    try {
      return await Sensor.getHartRange(start, end, cookie);
    } catch (err) {
      return [{ code: 500, message: err }];
    }
  },

  sport: async ({ sportID }) => {
    try {
      return await Sensor.getSport(sportID);
    } catch (err) {
      return { code: 500, message: err };
    }
  },

  sporten: async () => {
    try {
      return await Sensor.getSporten();
    } catch (err) {
      return [{ code: 500, message: err }];
    }
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

  wedstrijd: async ({start, end}) => {
    try{
      
      let now = new Date()
      let sD = now.getDate()
      let sM = now.getMonth() + 1
      let sJ = now.getFullYear()

      let startDate = new Date(`${sD}-${sM}-${sJ}`);
      let endDate = new Date(`${sD}-${sM+1}-${sJ}`)

      if(start != ""){
        startDate = new Date(start)
      }
      if(end != ""){
        endDate = new Date(end);
      }

      return await Account.getWedstrijd(startDate, endDate);
    } catch(err){
      console.log(err)
      return {code: 500, message: err}
    }
  },
};

module.exports = root;
