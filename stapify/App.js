import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Components
import Home from './Home';
import Verwerk from './Verwerk';

const Stack = createStackNavigator();

const App = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" hidden />
            <NavigationContainer>
                <Stack.Navigator
                    //default screen is home
                    initialRouteName="Home"
                    headerMode="screen"
                >
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        //geen header want dat is lelijk
                        options={{
                            headerMode: 'false'
                        }}
                    >
                    </Stack.Screen>
                    <Stack.Screen
                        name="Verwerk"
                        component={Verwerk}
                        options={{
                            headerTitleAlign: 'center'
                        }}
                    >
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

export default App;