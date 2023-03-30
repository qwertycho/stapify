var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

var schema = buildSchema(`

    type StappenType {
        aantalStappen: Int,
        tijd: String
    }

    type BMIType {
        bmi: Float,
        tijd: String
    }

    type sportSType {
        maandag: Int,
        dinsdag: Int,
        woensdag: Int,
        donderdag: Int,
        vrijdag: Int,
        zaterdag: Int,
        zondag: Int
    }

    type AccountType {
        accountID: Int,
        username: String
        geboortedatum: String,
        aanmelddatum: String
    }

    type MyAccountType {
        accountID: Int,
        username: String
        geboortedatum: String,
        aanmelddatum: String,
        stappen: StappenType,
        bmi: BMIType,
        sportSchema: sportSType
    }

    type responseType {
        code: Int,
        message: String
    }

    type Query {
        accounts: [AccountType]
        account(username: String): AccountType
        myAccount(cookie: String): MyAccountType
        login(username: String, password: String): String
    }

    type Mutation {
        createAccount(username: String, password: String, geboortedatum: String): String
        stappen(aantalStappen: Int, cookie: String): responseType
        bmi(bmi: Float, cookie: String): responseType
    }    
`);

module.exports = schema;