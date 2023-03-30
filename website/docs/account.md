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
        sportSchema: sportSType
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