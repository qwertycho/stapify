const pool = require("../models/Database");
const responseType = require("../models/ResponseDetails");
const bcrypt = require("bcrypt");
const saltRounds = 2;
const MA = require("../models/AccountDetails");

class Sensor {
  constructor(pool) {
    this.pool = pool;
  }

  // divide the day in 4 parts
  // return a datetime object with the current date and the time of the part of the day
  getCurrentTime() {
    let date = new Date();
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    let time = date.getHours();
    if (time <= 6) {
      date.setHours(6);
      return date;
    } else if (time <= 12) {
      date.setHours(12);
      return date;
    } else if (time <= 18) {
      date.setHours(18);
      return date;
    } else if (time <= 24) {
      date.setHours(0);
      date.setDate(date.getDate() + 1);
      return date;
    }
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

/**
 * 
 * @param {*} aantalStappen 
 * @param {*} cookie 
 * @returns boolean
 * @returns ERROR if something went wrong
 * Insert stappen in de database en koppelt deze aan een account
 * Vraagt eerst aan checkCookie of de cookie geldig is en krijgt dan het accountID terug
 * Vraagt vervolgens aan getCurrentTime wat de huidige tijd is en koppelt deze aan de stappen
 */
  async insertStappen(aantalStappen, cookie) {
    let accountID = await this.checkCookie(cookie);
    if (accountID) {
      try {
        let conn = await this.pool.getConnection();
        let dateTime = this.getCurrentTime();
        let rows = await conn.query(
          "INSERT INTO stappen (waarde, accountID, dateTime) VALUES (?, ?, ?)",
          [aantalStappen, accountID, dateTime]
        );

        conn.release();

        return true;
      } catch (err) {
        throw err;
      }
    } else {
      return false;
    }
  }

  async insertBMI(bmi, cookie) {
    let accountID = await this.checkCookie(cookie);
    if (accountID) {
      try {
        let conn = await this.pool.getConnection();
        let rows = await conn.query(
          "INSERT INTO bmi (waarde, accountID) VALUES (?, ?)",
          [bmi, accountID]
        );

        conn.release();

        return true;
      } catch (err) {
        throw err;
      }
    } else {
      return false;
    }
  }

  async insertHartslag(hartslag, cookie) {
    let accountID = await this.checkCookie(cookie);
    if (accountID) {
      try {
        let conn = await this.pool.getConnection();
        let dateTime = this.getCurrentTime();
        let rows = await conn.query(
          "INSERT INTO hartslagen (waarde, accountID, dateTime) VALUES (?, ?, ?)",
          [hartslag, accountID, dateTime]
        );

        conn.release();

        return true;
      } catch (err) {
        throw err;
      }
    } else {
      return false;
    }
  }

  async getSport(sportID){
    try {
      let conn = await this.pool.getConnection();
      let rows = await conn.query(
        "SELECT sport FROM sporten WHERE sportID = ?",
        [sportID]
      );

      conn.release();

      return rows[0].sport;
    } catch (err) {
      throw err;
    }
  }

/**
 * 
 * @param {*} startDate als string (yyyy-mm-dd)
 * @param {*} endDate als string (yyyy-mm-dd)
 * @param {*} cookie 
 * @returns array met stap objecten
 * @brief Vraag mij niet waarom dit niet werkt met een iso string
 */
  async getStapRange(startDate, endDate, cookie) {
    let accountID = await this.checkCookie(cookie);
    if (accountID) {
      try {

        let conn = await this.pool.getConnection();
        let rows = await conn.query(
          "SELECT dateTime, waarde FROM stappen WHERE dateTime BETWEEN ? AND ? AND accountID = ?",
          [startDate, endDate, accountID]
        );

        conn.release();

        let ray = [];

        for (let i = 0; i < rows.length; i++) {
          let obj = {
            tijd: rows[i].dateTime,
            aantalStappen: rows[i].waarde,
          };
          ray.push(obj);
        }

        return ray;

      } catch (err) {
        throw err;
      }
    } else {
      return false;
    }
  }

}

module.exports = Sensor;
