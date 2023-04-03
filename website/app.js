const express = require("express");
const app = express();
const dotenv = require("dotenv");

// controllers
const AccountController = require("./controllers/Account");

var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

// Load environment variables
dotenv.config();

const port = process.env.PORT || 3001;
let pool = require("./models/Database");

// routers
const IndexRouter = require("./routes/Index");

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
var schema = require("./models/Schema");

// // The root provides a resolver function for each API endpoint
var root = require("./models/Root");

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.use("/", IndexRouter);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
