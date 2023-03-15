const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mariadb = require("mariadb");

// controllers
const AccountController = require("./controllers/Account");

var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");


// Load environment variables
dotenv.config();

const port = process.env.PORT || 3000;

// Connect to database
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionLimit: 5,
});

Account = new AccountController(pool);

// Test database connection
pool
  .getConnection()
  .then((conn) => {
    console.log("Connected to database");
    conn.release();
  })
  .catch((err) => {
    console.log("Error connecting to database");
    console.log(err);
  });

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`

    type AccountType {
        accountID: Int,
        username: String
        geboortedatum: String,
        aanmelddatum: String
    }

    type Query {
        accounts: String,
        account(username: String): AccountType
        login(username: String, password: String): Boolean
    }        
`);


// The root provides a resolver function for each API endpoint
var root = {
  accounts: async () => {
    let accounts = await AccountModel.getAccounts();
    return accounts[0].username;
  },
  account: async ({ username }) => {

    return await Account.getAccount(username);
  },
    login: async ({ username, password }) => {
        return await Account.login(username, password);
    }
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  let users = [];
  pool
    .getConnection()
    .then((conn) => {
      conn
        .query("SELECT * FROM accounts")
        .then((rows) => {
          users = rows;
          conn.release();
          res.send(users);
        })
        .catch((err) => {
          console.log("Error querying database");
        });
    })
    .catch((err) => {
      console.log("Error connecting to database");
    });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
