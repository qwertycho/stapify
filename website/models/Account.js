const pool = require("../models/Database");
const AccountDetails = require("../models/AccountDetails");
const bcrypt = require("bcrypt");
const myAccount = require("../models/MyAccount");
const BMI = require("../models/AccountDetails");
const saltRounds = 2;


const SchemaModel = require("../models/SchemaModel");

class Accounts {
  constructor(pool) {
    this.pool = pool;
    this.SchemaModel = new SchemaModel(pool);
  }


  async checkCookie(cookie) {
    try {
      let conn = await this.pool.getConnection();
      let rows = await conn.query(
        "SELECT accountID FROM cookies WHERE token = ? AND date > NOW()",
        [cookie]
      );
      conn.release();

      if (rows.length > 0) {
        return rows[0].accountID;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  }

  async getAccounts() {
    try {
      let conn = await this.pool.getConnection();
      let rows = await conn.query(
        "SELECT accountID, username, aanmelddatum FROM accounts"
      );
      conn.release();

      return rows;
    } catch (err) {
      throw err;
    }
  }

  async getAccount(username) {
    try {
      let conn = await this.pool.getConnection();
      let rows = await conn.query(
        "SELECT accountID, username, geboortedatum, aanmelddatum FROM accounts WHERE username = ?",
        [username]
      );
      conn.release();

      return new AccountDetails(
        rows[0].accountID,
        rows[0].username,
        rows[0].geboortedatum,
        rows[0].aanmelddatum
      );
    } catch (err) {
      throw err;
    }
  }

  async getbmi(id) {
    try {
      let conn = await this.pool.getConnection();
      let rows = await conn.query(
        "SELECT waarde AS bmi, dateTime as tijd FROM bmi WHERE accountID = ? ORDER BY dateTime DESC LIMIT 1",
        [id]
      );

      conn.release();

      let bmi = new BMI.BMI(rows[0].bmi, new Date());

      return bmi;
    } catch (err) {
      throw err;
    }
  }

  async getStappen(id) {
    try {
      let conn = await this.pool.getConnection();
      // tel alle stappen op van de huidige dag 
      let rows = await conn.query(`SELECT SUM(waarde) AS stappen
        FROM stappen
        WHERE accountID = ? 
        AND dateTime BETWEEN CURDATE() AND CURDATE() + INTERVAL 1 DAY`,
        [id]
      );
      conn.release();

      let stappen = new AccountDetails.Stappen(rows[0].stappen, new Date());
      return stappen;
    } catch (err) {
      throw err;
    }
  }

  async getMyAccount(cookie) {
    let accountID = await this.checkCookie(cookie);
    if (accountID) {
      try {
        let conn = await this.pool.getConnection();
        let rows = await conn.query(
          "SELECT * FROM accounts WHERE accountID = ?",
          [accountID]
        );
        conn.release();
        let bmi = await this.getbmi(accountID);
        let stappen = await this.getStappen(accountID);
        let sportSchema = await this.SchemaModel.getSchema(accountID);
        let account = rows[0];

        let MA = new myAccount(
          accountID, 
          account.username, 
          account.geboorteDatum, 
          account.aanmeldDatum,
          stappen,
          bmi,
          sportSchema
          );

        return MA;

      } catch (err) {
        throw err;
      }
    } else {
      return false;
    }
  }

  /**
   *
   * @param {*} username
   * @returns STRING cookie
   * @returns FALSE if username already exists
   * @returns ERROR if something went wrong
   * Genereeert een cookie en slaat deze op in de database met een verloopdatum van 1 dag
   */
  async createCookie(username) {
    try {
      let conn = await this.pool.getConnection();

      let rows = await conn.query(
        "SELECT accountID FROM accounts WHERE username = ?",
        [username]
      );

      let accountID = rows[0].accountID;

      let expires = new Date();
      expires.setDate(expires.getDate() + 1);
      let cookie = await bcrypt.hash(username, saltRounds);

      await conn.query(
        "INSERT INTO cookies (accountID, token, date) VALUES (?, ?, ?)",
        [accountID, cookie, expires]
      );

      conn.release();

      return cookie;
    } catch (err) {
      throw err;
    }
  }

  /**
   *
   * @param {*} username
   * @param {*} password
   * @returns String cookie
   * @returns FALSE if username doesn't exist
   * @returns ERROR if something went wrong
   * Login functie die een cookie genereert en opslaat in de database
   */
  async login(username, password) {
    try {
      let conn = await this.pool.getConnection();
      let rows = await conn.query(
        "SELECT username, wachtwoord FROM accounts WHERE username = ?",
        [username]
      );

      if (rows.length == 0) {
        conn.release();
        return false;
      } else {
        let hash = rows[0].wachtwoord;
        let result = await bcrypt.compare(password, hash);
        conn.release();
        return await this.createCookie(username);
      }
    } catch (err) {
      throw err;
    }
  }

  async createAccount(username, password, geboortedatum) {
    if (username == "" || password == "" || geboortedatum == "") return false;

    try {
      let conn = await this.pool.getConnection();
      let account = await conn.query(
        "SELECT accountID FROM accounts WHERE username = ?",
        [username]
      );

      if (account.length == 0) {
        let hash = await bcrypt.hash(password, saltRounds);

        await conn.query(
          "INSERT INTO accounts (username, wachtwoord, geboortedatum) VALUES (?, ?, ?)",
          [username, hash, geboortedatum]
        );
        conn.release();
        return await this.createCookie(username);
      } else {
        conn.release();
        return false;
      }
    } catch (err) {
      throw err;
    }
  }

  async getSportSchema(cookie){
    let accountID = await this.checkCookie(cookie);
    if (accountID) {
      try {
        return await SchemaModel.getSportSchema(accountID);
      } catch (err) {
        throw err;
      }
    }
  }


}

module.exports = Accounts;
