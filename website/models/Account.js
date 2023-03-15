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
      return rows;
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
            
            if(rows.length == 0){
                return false;
            } else {
                return true;
            }

        } catch (err) {
            throw err;
        }
    }
}

module.exports = Accounts;
