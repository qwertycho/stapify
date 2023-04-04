import React from "react";
import {Button, Text, TextInput, View, StyleSheet, Alert} from 'react-native';

import {useQuery} from '@apollo/client';
import {gql} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {GET_STAPPEN} from '../graphs/Stappen';

export default function Stappen() {

    async function getCookie() {
        return await AsyncStorage.getItem('login');
    }

    const [cookie, setCookie] = React.useState('');

    const {loading, error, data} = useQuery(GET_STAPPEN, {
        variables: {cookie: cookie},
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Stappen</Text>
            <Button
                title="Stappen"
                onPress={async () => {
                    setCookie(await getCookie());
                    console.log(cookie);
                }}
                color="#708090"
            />
            {/* <Text style={styles.text}>Stappen: {data.account.stappen.stappen}</Text> */}
            {/* <Text style={styles.text}>Stappen: {data.account.stappen.stappen}</Text> */}
        </View>
    );
}

const styles = StyleSheet.create({

});