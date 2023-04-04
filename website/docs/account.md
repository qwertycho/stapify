# Account type

## publieke account informatie

    type AccountType {
        accountID: Int,
        username: String
        geboortedatum: String,
        aanmelddatum: String
    }

## eigen account informatie

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


### voorbeeld persoonelijke account:

query:

{
  myAccount(cookie: "tanterlange string"){
    username,
    geboortedatum,
    aanmelddatum,
    accountID,
    stappen {
      aantalStappen
    },
    bmi {
      bmi
    },
    sportSchema{
      maandag,
      dinsdag,
      woensdag,
      donderdag,
      vrijdag,
      zaterdag,
      zondag
    }
  }
}

reactie van de server:

{
  "data": {
    "myAccount": {
      "username": "azertycho",
      "geboortedatum": "-19962000000",
      "aanmelddatum": "1678976929000",
      "accountID": 2,
      "stappen": {
        "aantalStappen": 5994
      },
      "bmi": {
        "bmi": 22.5
      },
      "sportSchema": {
        "maandag": 1,
        "dinsdag": 2,
        "woensdag": 3,
        "donderdag": 4,
        "vrijdag": 5,
        "zaterdag": 6,
        "zondag": 7
      }
    }
  }
}

## ranges
het is mogelijk om een range op te vragen van de stappen


### query voor een range
stapRange(cookie: String, start: String, end: String): [StappenType]

### voorbeeld

query:

{
  stapRange(cookie: "tanterlange string", start: "2020-01-01", end: "2020-01-31"){
    aantalStappen,
    tijd
  }
}

range van de stappen van januari 2020

reactie van de server:

{
  "data": {
    "stapRange": [
      {
        "aantalStappen": 5994,
        "tijd": "2020-01-01"
      },
      {
        "aantalStappen": 5994,
        "tijd": "2020-01-02"
      },
      etc
    ]
  }
}