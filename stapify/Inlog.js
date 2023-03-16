import React, { useState } from "react";
import { Button, Text, TextInput, View, StyleSheet, Alert } from "react-native";


const Inlog = ({ navigation }) => {

    const [formUsername, setFormUsername] = useState("Enter username");
    const [formPassword, setFormPassword] = useState("Enter password");

    return (
        <View style={Styles.inlogContainer}>
            <Text style={Styles.inputLabel}>Username:</Text>
            <TextInput
                style={ Styles.inputField }
                onChangeText={text => setFormUsername(text)}
                value={formUsername}
            />
            <Text style={Styles.inputLabel}>Password:</Text>
            <TextInput
                style={ Styles.inputField }
                onChangeText={text => setFormPassword(text)}
                value={formPassword}
            />
            <Button	
                title="Inloggen"
                onPress={() => {
                    if (formUsername === "admin" && formPassword === "admin") {
                        navigation.navigate("Verwerk");
                    } else {
                        Alert.alert("Verkeerde gebruikersnaam of wachtwoord");
                    }
                }}
            />
            <Button	
                title="Registreren"
                onPress={() => {
                    navigation.navigate("Verwerk");
                }}
                style={{
                    marginTop: 20
                }}
            />
        </View>
    );

}

const Styles = StyleSheet.create({
    inlogContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputLabel: {
        fontSize: 20,
        textAlign: "center",
        marginTop: 10,
        marginBottom: 10,
        width: 200
    },
    inputField: {
        height: 40, 
        borderColor: "black",
        borderWidth: 1,
        opacity: 0.5,
        fontStyle: "italic",
        width: 200,
        padding: 10,
        marginBottom: 20
    },
    Button: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginRight: 10,
        marginLeft: 10,
    },
    ButtonText: {
        fontSize: 20
    }
});


export default Inlog;