import React, { useState } from "react";
import { Button, Text, TextInput, View, StyleSheet, Alert } from "react-native";

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


import { useQuery } from "@apollo/client";

import { accounts_query, account_query, Inlog_query } from "./query";

const Inlog = ({ navigation }) => {

    let queryName = "null";

    const { loading, error, data } = useQuery(Inlog_query, {
        variables : {
            username: "remco",
            password: "remstar"
        }
    });

    if (loading) queryName = "loading";

    if (error) queryName = "error";

    if(error) console.log(error);

    if (data) queryName = data.login;

    console.log(data);

    const [formUsername, setFormUsername] = useState("Enter username");
    const [formPassword, setFormPassword] = useState("Enter password");

    const submit = () => {
        if (!formUsername || !formPassword) {
            Alert.alert("Please enter username and password!");
        }else if (formUsername == "Enter username" || formPassword == "Enter password") {
            Alert.alert("Invalid username or password!");
        }else{
            Alert.alert(`You are logged in ${formUsername}!`);
            navigation.navigate("Home");
        }
    }

    return (
        <View style={Styles.form}>
            <Text>
                {queryName}
            </Text>
            <Text style={Styles.label}>
                Username:
            </Text>
            <TextInput
                style={Styles.textInput}
                onChangeText={usename => setFormUsername(usename)}
                value={formUsername}
                autoCapitalize="none"
                selectTextOnFocus={true}
            />
            <Text style={Styles.label}>
                Password:
            </Text>
            <TextInput
                style={Styles.textInput}
                onChangeText={password => setFormPassword(password)}
                value={formPassword}
                autoCapitalize="none"
                selectTextOnFocus={true}
                secureTextEntry={true}
            />
            <Button 
                title="Login"
                onPress={submit}
                color="#708090"
            />
        </View>
    );

}

const Styles = StyleSheet.create({
    form: {
        alignItems: "center",
        flexDirection: "column",
        padding: 20,
        backgroundColor: "#fff",
        height: "100%",
        
    },
    textInput: {
        borderWidth: 1,
        width: "80%",
        paddingBottom: 15,
        paddingTop: 15,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 15,
        borderRadius: 5,
        borderColor: "#708090"
    },
    label: {
        paddingTop: 15,
        paddingBottom: 5,
    }
});


export default Inlog;