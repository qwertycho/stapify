import React, { useState } from "react";
import { Button, Text, TextInput, View, StyleSheet, Alert, navigation } from "react-native";

// import DatePicker from 'react-native-date-picker'
import { useLazyQuery } from "@apollo/client";
import { gql } from "@apollo/client";

export const LOG_IN =
    gql`
    query login($username: String!, $password: String!) {
        login(username: $username, password: $password) 
    }
`;

const Inlog = (props) => {

    // Dit kan je zien als variabelen die je kan aanpassen
    const [formUsername, setFormUsername] = useState("Enter username");
    // const [formBirthdate, setDate] = useState(new Date());
    const [formPassword, setFormPassword] = useState("Enter password");
    //boolean voor de datepicker model
    // const [open, setOpen] = useState(false)

    console.log(formUsername);

    // use LOG_IN query to get data from database

    const [refetch, { error, data }] = useLazyQuery(LOG_IN);


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
                color="#708090"
                onPress={() => {

                    let ingelogd = false;

                    if (ingelogd) {

                        if (!formUsername || !formPassword) {
                            Alert.alert("Some fields are empty, Please try again!");                                // als de useState is ingevuld, geef error
                        } else if (formUsername == "Enter username" || formPassword == "Enter password") {         // als de useState niet is aangepast, geef error
                            Alert.alert("Invalid username or password, Please try again!");
                        } else {
                
                            refetch({
                                variables: {
                                    username: formUsername,
                                    password: formPassword
                                }
                            });
                
                            console.log(error);
                            console.log(data);
                
                        }
                        
                        if (data) {
                
                            ingelogd = true;
                        
                        } 
                    } else {
                        props.navigation.navigate("Home");
                    }
                    
                }
            }
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