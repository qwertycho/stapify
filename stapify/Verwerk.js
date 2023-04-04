import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

//get all data from navigate function to this page
export default function Verwerk() {

    const { loading, error, data } = useQuery(GET_ALLUSERSDATA);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error :/</Text>;
    if (data) {
        return (
            <View style={Styles.container}>
                <Text style={Styles.title}>Data</Text>
                <FlatList
                    data={data.accounts}
                    renderItem={({ item }) => (
                        <Text style={Styles.item}>
                            {item.accountID} {item.username} {item.geboortedatum} {item.aanmelddatum}
                        </Text>
                    )}
                    keyExtractor={(item) => item.accountID}
                />
            </View>
        );
    }
}

export const GET_ALLUSERSDATA = 
gql`
    query{ 
        accounts {
            accountID
            username
            geboortedatum
            aanmelddatum
        } 
    }
`;


const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    item: {
        fontSize: 15,
        marginBottom: 20,
    },
});



