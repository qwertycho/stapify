import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Menu = () => {

    const navigation = useNavigation();

    return (
        <View style={Styles.Menu}>
            {/* TouchableOpacity is een soort button */}
            <TouchableOpacity
            onPress={() => navigation.navigate('Verwerk')}
            style={Styles.Button}
            >
                <Text style={Styles.ButtonText}>Verwerk</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => 
                AsyncStorage.removeItem('login')
                .then(() => navigation.navigate('Inlog'))

            }
            style={Styles.Button}
            >
                <Text style={Styles.ButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const Styles = StyleSheet.create({
    Menu: {
        flexDirection: 'row',
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

export default Menu;