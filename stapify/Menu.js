import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
            onPress={() => navigation.navigate('Inlog')}
            style={Styles.Button}
            >
                <Text style={Styles.ButtonText}>Inlog</Text>
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