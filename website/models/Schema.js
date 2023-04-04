var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

var schema = buildSchema(`

    input sportSchemaInput {
        maandag: Int,
        dinsdag: Int,
        woensdag: Int,
        donderdag: Int,
        vrijdag: Int,
        zaterdag: Int,
        zondag: Int
    }

    input eetSchemaInput {
        maandag: String,
        dinsdag: String,
        woensdag: String,
        donderdag: String,
        vrijdag: String,
        zaterdag: String,
        zondag: String
    }

    type StappenType {
        aantalStappen: Int,
        tijd: String
    }

    type BMIType {
        bmi: Float,
        tijd: String
    }

    type hartslagType {
        hartslag: Int,
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

    type eetSType {
        maandag: String,
        dinsdag: String,
        woensdag: String,
        donderdag: String,
        vrijdag: String,
        zaterdag: String,
        zondag: String
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
        hartslag: hartslagType,
        sportSchema: sportSType,
        eetSchema: eetSType
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
        sport(sportID: Int): String
        stapRange(cookie: String, start: String, end: String): [StappenType]
        cookie(cookie: String): Boolean
    }

    type Mutation {
        createAccount(username: String, password: String, geboortedatum: String): String
        stappen(aantalStappen: Int, cookie: String): responseType
        bmi(bmi: Float, cookie: String): responseType
        hartslag(hartslag: Int, cookie: String): responseType
        sportSchema(sportSchema: sportSchemaInput, cookie: String): responseType
        eetSchema(eetSchema: eetSchemaInput, cookie: String): responseType
    }
`);

module.exports = schema;