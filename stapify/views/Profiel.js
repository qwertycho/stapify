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
import { CHECK_COOKIE } from '../graphs/Login';
import {
    LOGIN,
    GET_USERDATA
} from '../graphs/Login';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

export default function Profiel() {
    const [cookie, setCookie] = React.useState('');
    const [TempCookie, setTempCookie] = React.useState('');
    const [status, setStatus] = React.useState('');

    useEffect(() => {
        async function fetchData() {
            const cookie = await getCookie();
            setTempCookie(cookie);
        }
        fetchData();
    }, []);

    console.log(TempCookie);

    // controleren of de cookie nog geldig is
    const { Cloading, Cerror, Cdata } = useQuery(CHECK_COOKIE, {
        variables: { cookie: TempCookie },
        skip: TempCookie === '',
        onCompleted: data => {
            if (data.cookie === true) {
                setCookie(TempCookie);
            } else {
                setStatus('Niet ingelogd');
            }
        },
    });

    return (
        <ScrollView>

            <Text style={styles.item}>Status: {status}</Text>
            {/*             
            <View style={styles.container}>
                <Text style={styles.item}>Gebruikersnaam: {account?.username}</Text>
                <Text style={styles.item}>Geboortedatum: {account?.geboortedatum}</Text>
                <Text style={styles.item}>Aanmelddatum: {account?.aanmelddatum}</Text>
            </View>

            <View style={styles.container}>
                <Text style={styles.item}>BMI: </Text>
            </View>

            <View style={styles.container}>
                <Text style={styles.text}>Wat is uw gewicht?</Text>
                <TextInput
                    style={styles.item}
                    placeholder="0 kg"
                    onChangeText={(gewicht) => setGewicht(gewicht)}
                />

                <Text style={styles.text}>Wat is uw lengte?</Text>
                <TextInput
                    style={styles.item}
                    placeholder="0 cm"
                    onChangeText={(lengte) => setLengte(lengte)}
                />

                <Text style={styles.text}>Wat is uw leeftijd?</Text>
                <TextInput
                    style={styles.item}
                    placeholder="0 jaar"
                    onChangeText={(leeftijd) => setLeeftijd(leeftijd)}
                />

                <Text style={styles.text}>Wat is uw geslacht?</Text>
                <TextInput
                    style={styles.item}
                    placeholder="Geslacht"
                    onChangeText={(geslacht) => setGeslacht(geslacht)}
                />

                <TouchableOpacity
                    onPress={() => {
                        submit();
                    }}
                    style={styles.button}>
                    <Text style={styles.text}>Opslaan</Text>
                </TouchableOpacity>
            </View> */}
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
    },
    item: {
        fontSize: 15,
        marginBottom: 20,
    },
});
