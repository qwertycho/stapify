# Communicatie

Communicatie is de class die verandwoordelijk is voor alle communicatie.
Het beheerd de Serial en BLE interfaces en maakt het mogelijk om de instellingen aan te passen
Ook ontvangt het data en is verantwoordelijk om het te parsen.

Communicatie is een singleton class, dat betekend dat er maar 1 instance van is die word gedeelt.

# Protocol

Het protocol voor het versturen/ontvangen van data gaat als volgt:

[type] waarde , checksum ;
Voorbeeld: [LOG] ERROR, Er is een fout, 1;

## validatie
Als de ontvanger een bericht ontvangt moet deze het bericht controleren met behulp van de checksum.
Als de checksum goed is moet de ontvanger reageren met : [OK] 1, 0;
Als de checksum niet correct is moet de ontvanger reageren mer : [ERR] 1, 0;

Zo weet de verstuurder hoe het bericht is ontvangen.
Als het bericht goed is ontvangen worden de buffers van het bericht leeggemaakt.
Als het bericht niet goed is ontvangen word het bericht opnieuw verstuurd.

## checksum
De checksum is een simpele bool die aangeeft of de lengte van het bericht even of oneven is.
dus: mooi bericht = 12 lang dus even, 1
mooie bericht = 13 lang, dus oneven, 0