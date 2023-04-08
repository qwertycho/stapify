import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Sportschema() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sportschema</Text>
            <Text style={styles.text}>Hier komt het sportschema</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
    },
    text: {
        fontSize: 20,
    },
});