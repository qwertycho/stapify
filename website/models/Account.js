const pool = require("../models/Database");
const AccountDetails = require("../models/AccountDetails");
const bcrypt = require('bcrypt');
const saltRounds = 2;

class Accounts {
  constructor(pool) {
    this.pool = pool;
  }

  async getAccounts() {
    try {
      let conn = await this.pool.getConnection();
      let rows = await conn.query(
        "SELECT accountID, username FROM accounts"
      );
      conn.release();
      console.log(rows);
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

        let token = await bcrypt.hash(username, saltRounds);

        let expires = new Date();
        expires.setHours(expires.getHours() + 1);

        await conn.query(
          "INSERT INTO cookies (token, date, username) VALUES (?, ?, ?)", [token, expires, username]
        );

        return token;
      }

    } catch (err) {
      throw err;
    }
  }

  async createAccount(username, password, geboortedatum) {
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
        return true;
      } else {
        conn.release();
        return false;
      }

    } catch (err) {
      throw err;
    }
  }
}

module.exports = Accounts;
