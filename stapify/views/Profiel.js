import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Alert,
    Button,
    Touchable,
    TouchableOpacity,
} from 'react-native';

import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { getCookie } from '../models/Cookie';
import {
    LOGIN,
    GET_USERDATA,
    CHECK_COOKIE,
} from '../graphs/Login';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

export default function Profiel() {
    const [cookie, setCookie] = React.useState('');
    const [TempCookie, setTempCookie] = React.useState('');

    /* Dit was een hulpmiddel voor dev */
    // const [status, setStatus] = React.useState('');

    const [account, setAccount] = React.useState(null);
    const [gewicht, setGewicht] = React.useState('');
    const [lengte, setLengte] = React.useState('');


    const [BMI, setBMI] = React.useState('');

    useEffect(() => {
        async function fetchData() {
            const cookie = await getCookie();
            setTempCookie(cookie);
        }
        fetchData();
    }, []);


    // controleren of de cookie nog geldig is
    const { Cloading, Cerror, Cdata } = useQuery(CHECK_COOKIE, {
        variables: { cookie: TempCookie },
        skip: TempCookie === '',
        onCompleted: data => {
            if (data.cookie === true) {
                setCookie(TempCookie);
            } else {
                // setStatus('Niet ingelogd');
            }
        },
    });

    // er word een check gedaan of de cookie leeg is
    // fetchPolicy: 'no-cache' zorgt ervoor dat de data niet wordt opgeslagen in de cache
    // zo word er altijd een nieuwe query gedaan
    const { loading, error, data } = useQuery(GET_USERDATA, {
        variables: { cookie: cookie },
        skip: cookie === '',
        fetchPolicy: 'no-cache',
        onCompleted: data => {
            if (data.myAccount.username === null) {
                // setStatus('Geen account');
                setAccount(null);
            } else {
                // setStatus('Account gevonden');
                setAccount(data.myAccount);
            }
        },
    });

    const readAbleDate = (date) => {
        try {
            //maak de ophehaalde datum echt een nummer
            let numberDate = Number(date);

            //maak een datum object van het nummer
            let datumDate = new Date(numberDate);

            //xx - xx - xxxx
            let datum = datumDate.getDate() + " - " + (datumDate.getMonth() + 1) + " - " + datumDate.getFullYear();

            return datum;
        }
        catch (err) {
            console.log(err);
        }
    }

    const checkBMI = () => {
        try {
            //check of de BMI al is ingevuld
            if (account?.bmi === null) {
                console.log("BMI is nog niet ingevuld in de database");
                return;
            }
            else {
                return account?.bmi;
            }
        }
        catch (err) {
            console.log(err);
            return "Er is iets fout gegaan bij het ophalen van de BMI";
        }
    }

    const submit = () => {
        try {
            //validatie van user input
            if (gewicht === '') {
                return "Vul een gewicht in";
            }
            if (lengte === '') {
                return "Vul een lengte in";
            }

            console.log(gewicht);
            console.log(lengte);

            //vervang de komma of spatie voor een punt
            let floatG = gewicht.replace(",", ".");
            floatG = floatG.replace(" ", ".");
            let floatL = lengte.replace(",", ".");
            setGewicht(floatG);
            setLengte(floatL);


            console.log(gewicht);
            console.log(lengte);

            //maak van de user input een nummer
            // gewicht = Number(gewicht);
            // lengte = Number(lengte);
        }
        catch (err) {
            console.log(err);
            return "Er is iets fout gegaan bij het omzetten van de komma of spatie naar een punt";
        }

        try {
            //BMI berekennen = BMI = gewicht / (lengte * lengte)
            //gewicht is als de gebruiker het invult in kg
            //lengte is als de gebruiker het invult in cm (moet nog omgezet worden naar meter)
            //leeftijd is als de gebruiker het invult al in jaren
            let BMI = Number(gewicht) / ((Number(lengte) / 100) * (Number(lengte) / 100));
            console.log(BMI + "   1");

            //BMI afronden op 2 decimalen
            BMI = Math.round(BMI * 100) / 100;
            console.log(BMI);


            let BMIString = BMI.toString();

            return BMIString;
        }
        catch (err) {
            console.log(err);
            return "Er is iets fout gegaan bij het berekenen van de BMI";
        }
    }


    return (
        <ScrollView>
            {/* Dit was een hulpmiddel voor dev */}
            {/* <Text style={styles.item}>Status: {status}</Text> */}

            <View style={styles.container}>
                <Text style={styles.item}>Welkom op jouw profiel, {account?.username}!</Text>
            </View>

            <View style={styles.container}>
                <Text style={styles.item}>geboortedatum: {readAbleDate(account?.geboortedatum)}</Text>

                <Text style={styles.item}>Aanmelddatum: {readAbleDate(account?.aanmelddatum)}</Text>
            </View>

            <View style={styles.container}>
                <Text style={styles.item}>BMI: {BMI}</Text>
            </View>

            <View style={styles.container}>
                <Text style={styles.text}>Wat is uw gewicht in kg?</Text>
                <TextInput
                    style={styles.itemInput}
                    placeholder="0 kg"
                    onChangeText={(gewicht) => setGewicht(gewicht)}
                />

                <Text style={styles.text}>Wat is uw lengte in cm?</Text>
                <TextInput
                    style={styles.itemInput}
                    placeholder="0 cm"
                    onChangeText={(lengte) => setLengte(lengte)}
                />

                <Text style={styles.noteText}>Geen komma's of spaties gebruiken!</Text>
                <Text style={styles.noteText}>Als BMI "NAN" is, druk dan nog een keer op opslaan</Text>

                <TouchableOpacity
                    onPress={() => {
                        checkBMI();
                        setBMI(submit());
                    }}
                    style={styles.button}>
                    <Text>Opslaan</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        border: "solid",
        borderColor: "black",
        borderWidth: 1,
        margin: 10,
        padding: 10,
        borderRadius: 10,
        textAlign: "left"
    },
    item: {
        fontSize: 15,
        marginBottom: 20,
    },
    itemInput: {
        fontSize: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
        padding: 10,
        width: 200,
    },
    text: {
        fontSize: 15,
        marginBottom: 20,
    },
    noteText: {
        fontSize: 15,
        marginBottom: 20,
    },
    button: {
        fontSize: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
        padding: 10,
        
    },
});