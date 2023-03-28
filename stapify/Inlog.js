import React, { useState } from "react";
import { Button, Text, TextInput, View, StyleSheet, Alert } from "react-native";
import DatePicker from 'react-native-date-picker'


const Inlog = ({ navigation }) => {

    // Dit kan je zien als variabelen die je kan aanpassen
    const [formUsername, setFormUsername] = useState("Enter username");
    const [formBirthdate, setDate] = useState(new Date());
    const [formPassword, setFormPassword] = useState("Enter password");
    //boolean voor de datepicker model
    const [open, setOpen] = useState(false)

    const submit = () => {
        if (!formUsername || !formPassword || !formBirthdate) {
            Alert.alert("Some fields are empty, Please try again!");
        }
        // als de useState niet is aangepast, geef error
        else if (formUsername == "Enter username" || formPassword == "Enter password") {
            Alert.alert("Invalid username, birthdate or password, Please try again!");
        }
        else {
            Alert.alert("Welcome " + formUsername + "!");
            navigation.navigate("Home");
        }
    }

    return (
        <View style={Styles.form}>
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