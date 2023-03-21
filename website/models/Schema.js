var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

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

    type Mutation {
        createAccount(username: String, password: String, geboortedatum: String): Boolean
    }    
`);

module.exports = schema;