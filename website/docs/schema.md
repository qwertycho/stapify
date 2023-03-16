# schema

GraphQL heeft een bepaalde volgorde van items die aan te roepen zijn. Dat is het schema

Er zijn twee soorten acties in een schema, Query en Mutation.

## Query
Het opvragen van informatie

   Query {
        accounts: String,
        account(username: String): AccountType
        login(username: String, password: String): Boolean
    }

### Voorbeeld:

query{
    account(username: "qwertycho"){
        accountID,
        aanmelddatum
    }
}

reactie van de server:
{
  "data": {
    "account": {
      "accountID": 1,
      "aanmelddatum": "1678367440000"
    }
  }
}

## Mutation
Het aanpassen van data

    type Mutation {
        createAccount(username: String, password: String, geboortedatum: String): Boolean
    }   

### Voorbeeld:

mutation{
  createAccount(username: "qwertycho", password: "123", geboortedatum: "69-69-4200")
}

reactie van de server:
{
  "data": {
    "createAccount": false
  }
}