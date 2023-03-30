const { isInterfaceType } = require("graphql");
const pool = require("../models/Database");

class sportSchema{
    constructor(
        maandag,
        dinsdag,
        woensdag,
        donderdag,
        vrijdag,
        zaterdag,
        zondag
    ){
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

  async getSchema(accountID) {
    try {
      let conn = await this.pool.getConnection();
      let rows = await conn.query(
        "SELECT * FROM sportSchema WHERE accountID = ?",
        [accountID]
      );
      conn.release();

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
        "SELECT * FROM sportSchema WHERE accountID = ? AND sport = 1",
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
              accountID
            ]
            );
      }
    } catch (err) {
      throw err;
    }
  }
}

module.exports = SchemaModel;
