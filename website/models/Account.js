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
      let conn = await this.pool.getConnection();
      let rows = await conn.query(
        "SELECT accountID FROM cookies WHERE token = ? AND date > NOW()",
        [cookie]
      );

      conn.release();

      if (rows.length > 0) {
        return rows[0].accountID;
      } else {
        throw "Cookie not found";
      }
  }

  async getAccounts() {
      let conn = await this.pool.getConnection();
      let rows = await conn.query(
        "SELECT accountID, username, aanmelddatum FROM accounts"
      );
      conn.release();

      return rows;
  }

  async getAccount(username) {
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
  }

  async getbmi(id) {
      let conn = await this.pool.getConnection();
      let rows = await conn.query(
        "SELECT waarde AS bmi, dateTime as tijd FROM bmi WHERE accountID = ? ORDER BY dateTime DESC LIMIT 1",
        [id]
      );
      conn.release();

      let bmi;

      if(rows.length == 0) {
        bmi = new BMI.BMI(0, new Date());
      } else {
        bmi = new BMI.BMI(rows[0].bmi, new Date());
      }

      return bmi;
  }

  async getStappen(id) {
      let conn = await this.pool.getConnection();
      // tel alle stappen op van de huidige dag 
      let rows = await conn.query(`SELECT SUM(waarde) AS stappen
        FROM stappen
        WHERE accountID = ? 
        AND dateTime BETWEEN CURDATE() AND CURDATE() + INTERVAL 1 DAY`,
        [id]
      );
      conn.release();

      let stappen;

      if(rows[0].stappen == null) {
        stappen = new AccountDetails.Stappen(0, new Date());
      } else {
        stappen = new AccountDetails.Stappen(rows[0].stappen, new Date());
      }

      return stappen;
  }

  async getHartslag(id) {
      let conn = await this.pool.getConnection();
      let rows = await conn.query(
        "SELECT waarde AS hartslag, dateTime as tijd FROM hartslagen WHERE accountID = ? ORDER BY dateTime DESC LIMIT 1",
        [id]
      );

      conn.release();

      let hartslag;

      if(rows.length == 0) {
        hartslag = new AccountDetails.Hartslag(0, new Date());
      } else {
        hartslag = new AccountDetails.Hartslag(rows[0].hartslag, new Date());
      }

      return hartslag;
  }

  async getLengte(id) {
      let conn = await this.pool.getConnection();
      let rows = await conn.query(
        "SELECT waarde AS lengte, dateTime as tijd FROM lengtes WHERE accountID = ? ORDER BY dateTime DESC LIMIT 1",
        [id]
      );

      conn.release();

      let lengte;

      if(rows.length == 0) {
        lengte = new AccountDetails.Lengte(0, new Date());
      } else {
        lengte = new AccountDetails.Lengte(rows[0].lengte, new Date());
      }

      return lengte;
    } 

  async getMyAccount(cookie) {
    let accountID = await this.checkCookie(cookie);
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
        let eetSchema = await this.SchemaModel.getEetSchema(accountID);
        let hartslag = await this.getHartslag(accountID);
        let lengte = await this.getLengte(accountID);

        let MA = new myAccount(
          accountID, 
          account.username, 
          account.geboorteDatum, 
          account.aanmeldDatum,
          stappen,
          bmi,
          sportSchema,
          eetSchema,
          hartslag,
          lengte
          );

        return MA;
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
      let conn = await this.pool.getConnection();
      let rows = await conn.query(
        "SELECT username, wachtwoord FROM accounts WHERE username = ?",
        [username]
      );

      conn.release();

      if (rows.length == 0) {
        return false;
      } else {
        let hash = rows[0].wachtwoord;

        let result = await bcrypt.compare(password, hash);

        if(result) {
           return await this.createCookie(username);
        } else {
          throw new Error("Wachtwoord is incorrect");
        }
      }
  }

  async createAccount(username, password, geboortedatum) {
    if (username == "" || password == "" || geboortedatum == "") throw new Error("Vul alle velden in");

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
  }

/**
 * @param {cookie, sportSchema}
 * @returns {boolean}
 * @returns {error}
 * voegt het sportschema toe aan de database of update degene die al bestaatd gebaseerd op de cookie
 * sportSChema is een object met maandag t/m zondag en elke dag is een int FK naar sporten
 */
  async insertSportSchema(cookie, sportSchema) {
      let accountID = await this.checkCookie(cookie);
      return await this.SchemaModel.insertSchema(accountID, sportSchema);
  }

  async insertEetSchema(cookie, eetSchema) {
      let accountID = await this.checkCookie(cookie);
      return await this.SchemaModel.insertEetSchema(accountID, eetSchema);
  }

  async getWedstrijd(startDate, endDate){

      let conn = await this.pool.getConnection();
      let result = await conn.query(
        ` SELECT SUM(waarde) as score, accounts.accountID, accounts.username
          FROM stappen
          INNER JOIN accounts
          on accounts.accountID = stappen.accountID
          WHERE stappen.accountID
          IN (SELECT DISTINCT stappen.accountID FROM stappen)
          AND datetime BETWEEN ? AND ?
          GROUP BY stappen.accountID
          ORDER BY score DESC
          LIMIT 25 
        `,
        [startDate, endDate]
      );
    conn.release()
    return result;
  }
}
module.exports = Accounts;
