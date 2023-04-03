import React, { useState } from "react";
import { Button, Text, TextInput, View, StyleSheet, Alert } from "react-native";

// import DatePicker from 'react-native-date-picker'
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

export const CHECK_USER = 
gql`
    query {
        accounts {
        accountID
        username
        geboortedatum
        aanmelddatum
        } 
    }
`;

const Inlog = () => {

    const submit = () => {
        if (!formUsername || !formPassword ) {
            Alert.alert("Some fields are empty, Please try again!");
        }else if (formUsername == "Enter username" || formPassword == "Enter password") {         // als de useState niet is aangepast, geef error
            Alert.alert("Invalid username, birthdate or password, Please try again!");
        }else {       
            const { loading, error, data } = useQuery(CHECK_USER);
            if (loading) return <Text>Loading...</Text>;
            if (error) return <Text>Error :/</Text>;
            if (data) {
                let found = false;
                data.accounts.forEach(element => {
                    if (element.username == formUsername) {
                        found = true;
                    }
                });
                if (found) {
                    Alert.alert("Login succesfull!");
                    navigation.navigate('Home');
                }else {
                    Alert.alert("Invalid username or password, Please try again!");
                }
            }
        }
          
    }

    
    // Dit kan je zien als variabelen die je kan aanpassen
    const [formUsername, setFormUsername] = useState("Enter username");
    // const [formBirthdate, setDate] = useState(new Date());
    const [formPassword, setFormPassword] = useState("Enter password");
    //boolean voor de datepicker model
    // const [open, setOpen] = useState(false)

    return (
        <View style={Styles.form}>
            <Text style={{ fontSize: 30, marginBottom: 20 }}>
                Login
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

            {/* Geboorte datum heb je niet nodig voor inlogen, alleen voor registreren */}
            {/* <Text style={Styles.label}>
                Geboortedatum:
            </Text>
            <Button title="Pick date" onPress={() => setOpen(true)} />
            <DatePicker
                modal
                mode="date"
                open={open}
                date={formBirthdate}
                onConfirm={(formBirthdate) => {
                    setOpen(false)
                    setDate(formBirthdate)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            /> */}
            <Text style={Styles.label}>
                Password:
            </Text>
            <Text style={{ fontSize: 15, marginBottom: 20 }}>
                password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character
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
        paddingTop: 25,
        paddingBottom: 10,
    }
});


export default Inlog;