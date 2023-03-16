const pool = require("../models/Database");
const AccountDetails = require("../models/AccountDetails");

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
        "SELECT accountID FROM accounts WHERE username = ? AND wachtwoord = ?",
        [username, password]
      );
      conn.release();

      if (rows.length == 0) {
        return false;
      } else {
        return true;
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
        await conn.query(
          "INSERT INTO accounts (username, wachtwoord, geboortedatum) VALUES (?, ?, ?)",
          [username, password, geboortedatum]
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
