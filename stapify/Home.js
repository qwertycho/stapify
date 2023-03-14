import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Menu from './Menu';

const Home =(props) => {
    return (
        <View style={Styles.container}>
            <Image 
                style={Styles.stapifyLogo}
                source={require('./images/stapifyLogo.png')}
            />
            <Text style={Styles.title}>Stapify</Text>
            <Text style={Styles.subtitle}>{props.username}</Text>
            <View style={Styles.textcontainer}>
                <Text style={Styles.content}>{introText}</Text>
            </View>
            <View style={Styles.Menu}>
                <Menu />
            </View>
        </View>	
    );
}

const introText = `Stapify is een app die je helpt om meer te bewegen. Door middel van een stappenteller en een aantal adviezen, word je aangemoedigd om meer te bewegen.`

const Styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        flex: 1
    },
    textcontainer: {
        padding: 20
    },
    stapifyLogo: {
        marginTop: 20,
        marginBottom: 20,
        width: 200,
        height: 200
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 5
    },
    Menu: {
        position: 'absolute',
        bottom: 10
    },
});

export default Home;