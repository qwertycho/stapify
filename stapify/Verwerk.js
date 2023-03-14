import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";

//test data is een array met objecten, maar moet natuurlijk worden vervangen door de data uit de database
//deze data is voor nu alleen voor het testen van de app en deze pagina moet dus ook worden aangepast zodat de data uit de database komt
import testData from "./testData";

const Verwerk = () => {

    const verwerkItem = ({ item }) => {

        return (
            <View style={Styles.Verwerk}>
                <Text style={Styles.VerwerkNaam}>
                Naam: {item.name}
                </Text>
                <Text style={Styles.VerwerkLeeftijd}>
                Leeftijd: {item.age}
                </Text>
                <Text style={Styles.VerwerkGelacht}>
                Gelacht: {item.gender}
                </Text>
                <Text 
                style={Styles.VerwerkOmschrijving}
                numberOfLines={3}
                ellipsizeMode="tail"
                >
                    {item.omschrijving}
                </Text>
                <Text style={Styles.VerwerkButton}>
                    Meer
                </Text>
            </View>
        );
    };
    
    return (
        <View style={Styles.container}>
            <FlatList 
                data={testData}
                renderItem={verwerkItem}
                keyExtractor={(item) => item.id}
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
    VerwerkNaam: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    VerwerkLeeftijd: {
        fontSize: 15,
        textAlign: 'center'
    },
    VerwerkGelacht: {
        fontSize: 15,
        textAlign: 'center'
    },
    VerwerkOmschrijving: {
        fontSize: 15,
        textAlign: 'center',
        padding: 10
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



