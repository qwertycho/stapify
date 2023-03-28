import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

//Ontvangt de data van de inlog pagina

const Verwerk = () => {

    //Ontvangt de data van de inlog pagina in een array
    const getData = (route) => {

       
    };

    
    const verwerkItem = () => {

        return (
            <View style={Styles.Verwerk}>
                <Text style={Styles.verwerkItem}>Gebruikersnaam: {getData.username}</Text>
                <Text style={Styles.verwerkItem}>Geboortedatum: {getData.birthdate}</Text>
                <Text style={Styles.verwerkItem}>Wachtwoord: {getData.password}</Text>
            </View>
        );
    };
    
    return (
        <View style={Styles.container}>
            <FlatList 
                data={getData}
                renderItem={verwerkItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const Styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 20
    },
    Verwerk: {
        flexDirection: 'column'
    },
    verwerkItem: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    VerwerkButton: {
        fontSize: 15,
        textAlign: 'center',
        color: 'blue',
        padding: 10,
        fontWeight: 'bold'
    }
});

export default Verwerk;



