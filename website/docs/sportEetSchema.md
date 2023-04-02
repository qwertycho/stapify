# eet/sport schema

## input types

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

### voorbeeld

  eetSchema(cookie: "cookie", 
  eetSchema:{
    maandag: "hopjes", 
    dinsdag: "stroopwafels", 
    woensdag: "broccoli", 
    donderdag: "suikerwafels", 
    vrijdag: "water", 
    zaterdag: "snoep", 
    zondag: "gebakken lucht"
    }) {
    code
    message
  }

#### reactie van de server

  {
  "data": {
    "eetSchema": {
      "code": 200,
      "message": "Eet schema toegevoegd"
    }
  }
}

