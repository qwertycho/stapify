# wedstrijd

## query:
{
  wedstrijd(start: "2022-05-01", end: "2023-06-01") {
    accountID
    username
    score
  }
}

Als start en end niet zijn ingevuld (lege string) dan word automatisch de eerste dag van de huidige en volgende maand gekozen
## response:

{
  "data": {
    "wedstrijd": [
      {
        "accountID": 2,
        "username": "azertycho",
        "score": 6969 
      },
      {
        "accountID": 4,
        "username": "pantor",
        "score": 420
      }
    ]
  }
}
