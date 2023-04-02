const pool = require("../models/Database");

class sportSchema {
  constructor(
    maandag,
    dinsdag,
    woensdag,
    donderdag,
    vrijdag,
    zaterdag,
    zondag
  ) {
    this.maandag = maandag;
    this.dinsdag = dinsdag;
    this.woensdag = woensdag;
    this.donderdag = donderdag;
    this.vrijdag = vrijdag;
    this.zaterdag = zaterdag;
    this.zondag = zondag;
  }
}

class eetSchema {
  constructor(
    maandag,
    dinsdag,
    woensdag,
    donderdag,
    vrijdag,
    zaterdag,
    zondag
  ) {
    this.maandag = maandag;
    this.dinsdag = dinsdag;
    this.woensdag = woensdag;
    this.donderdag = donderdag;
    this.vrijdag = vrijdag;
    this.zaterdag = zaterdag;
    this.zondag = zondag;
  }
}

class SchemaModel {
  constructor(pool) {
    this.pool = pool;
  }

  async getEetSchema(accountID) {
    try {
      let conn = await this.pool.getConnection();
      let rows = await conn.query(
        "SELECT * FROM eetSchema WHERE accountID = ?",
        [accountID]
      );

      if (rows.length == 0) {
        rows = [];
        rows[0] = {
          maandag: "Geen schema",
          dinsdag: "Geen schema",
          woensdag: "Geen schema",
          donderdag: "Geen schema",
          vrijdag: "Geen schema",
          zaterdag: "Geen schema",
          zondag: "Geen schema",
        };
      }

      conn.release();

      return new eetSchema(
        rows[0].maandag,
        rows[0].dinsdag,
        rows[0].woensdag,
        rows[0].donderdag,
        rows[0].vrijdag,
        rows[0].zaterdag,
        rows[0].zondag
      );
    } catch (err) {
      throw err;
    }
  }

  async getSchema(accountID) {
    try {
      let conn = await this.pool.getConnection();
      let rows = await conn.query(
        "SELECT * FROM sportSchema WHERE accountID = ?",
        [accountID]
      );
      conn.release();

      if (rows.length == 0) {
        rows = [];
        rows[0] = {
          maandag: "Geen schema",
          dinsdag: "Geen schema",
          woensdag: "Geen schema",
          donderdag: "Geen schema",
          vrijdag: "Geen schema",
          zaterdag: "Geen schema",
          zondag: "Geen schema",
        };
      }

      return new sportSchema(
        rows[0].maandag,
        rows[0].dinsdag,
        rows[0].woensdag,
        rows[0].donderdag,
        rows[0].vrijdag,
        rows[0].zaterdag,
        rows[0].zondag
      );
    } catch (err) {
      throw err;
    }
  }

  async sportSchemaExists(accountID) {
    try {
      let conn = await this.pool.getConnection();
      let rows = await conn.query(
        "SELECT * FROM sportSchema WHERE accountID = ?",
        [accountID]
      );
      conn.release();

      if (rows.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * 
   * @param {*} accountID 
   * @param {*} sportSChema
   * @returns boolean
   * controleert of er al een schema bestaat voor de accountID
   * als er al een schema bestaat wordt deze geupdate
   * als er nog geen schema bestaat wordt er een nieuw schema aangemaakt
   * Dit is nodig omdat er maar 1 schema per accountID mag zijn want dat is makkelijker om mee te werken
   */
  async insertSchema(accountID, schema) {
    try {
      let conn = await this.pool.getConnection();

      if (!(await this.sportSchemaExists(accountID))) {
        let rows = await conn.query(
          `INSERT INTO sportSchema (
                accountID,
                maandag,
                dinsdag,
                woensdag,
                donderdag,
                vrijdag,
                zaterdag,
                zondag
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            accountID,
            schema.maandag,
            schema.dinsdag,
            schema.woensdag,
            schema.donderdag,
            schema.vrijdag,
            schema.zaterdag,
            schema.zondag,
          ]
        );

        conn.release();

        return true;
      } else {
        let rows = await conn.query(
          `UPDATE sportSchema SET
            maandag = ?,
            dinsdag = ?,
            woensdag = ?,
            donderdag = ?,
            vrijdag = ?,
            zaterdag = ?,
            zondag = ?
            WHERE accountID = ?`,
          [
            schema.maandag,
            schema.dinsdag,
            schema.woensdag,
            schema.donderdag,
            schema.vrijdag,
            schema.zaterdag,
            schema.zondag,
            accountID,
          ]
        );

        conn.release();

        return true;
      }
    } catch (err) {
      throw err;
    }
  }

  async eetSchemaExists(accountID) {
    try {
      let conn = await this.pool.getConnection();
      let rows = await conn.query(
        "SELECT * FROM eetSchema WHERE accountID = ?",
        [accountID]
      );
      conn.release();

      if (rows.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  }

  async insertEetSchema(accountID, schema) {
    try {
      let conn = await this.pool.getConnection();

      if (!(await this.eetSchemaExists(accountID))) {
        let rows = await conn.query(
          `INSERT INTO eetSchema (
                accountID,
                maandag,
                dinsdag,
                woensdag,
                donderdag,
                vrijdag,
                zaterdag,
                zondag
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            accountID,
            schema.maandag,
            schema.dinsdag,
            schema.woensdag,
            schema.donderdag,
            schema.vrijdag,
            schema.zaterdag,
            schema.zondag,
          ]
        );

        conn.release();

        return true;
      } else {
        let rows = await conn.query(
          `UPDATE eetSchema SET
            maandag = ?,
            dinsdag = ?,
            woensdag = ?,
            donderdag = ?,
            vrijdag = ?,
            zaterdag = ?,
            zondag = ?
            WHERE accountID = ?`,
          [
            schema.maandag,
            schema.dinsdag,
            schema.woensdag,
            schema.donderdag,
            schema.vrijdag,
            schema.zaterdag,
            schema.zondag,
            accountID,
          ]
        );

        conn.release();

        return true;
      }
    } catch (err) {
      throw err;
    }
  }

}

module.exports = SchemaModel;
