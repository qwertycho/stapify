var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

var schema = buildSchema(`

    type AccountType {
        accountID: Int,
        username: String
        geboortedatum: String,
        aanmelddatum: String
    }

    type responseType {
        code: Int,
        message: String
    }

    type Query {
        accounts: [AccountType]
        account(username: String): AccountType
        login(username: String, password: String): String
    }

    type Mutation {
        createAccount(username: String, password: String, geboortedatum: String): String
        stappen(aantalStappen: Int, cookie: String): responseType
    }    
`);

module.exports = schema;