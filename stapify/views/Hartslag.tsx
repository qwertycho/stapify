import * as React from 'react';
// import type {Node} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Button} from 'react-native';
const Stack = createNativeStackNavigator();

// databronnen
import Hartslag from '../models/Hartslag';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


const HartslagPage = ({navigation}) => {
    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Hartslag schermpje</Text>
      <Button title="Ga terug naar de huisscreeen" onPress={() => navigation.navigate('Home')} />
      <Hartslag.HartslagDisplay />
    </View>
  );        
    
};


export default HartslagPage;