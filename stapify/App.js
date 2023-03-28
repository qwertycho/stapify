import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Components
import Home from './Home';
import Verwerk from './Verwerk';
import Inlog from './Inlog';

const Stack = createStackNavigator();

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


// Initialize Apollo Client
const client = new ApolloClient({
    uri: 'https://schoolmoettestdomeinenhebben.nl/graphql',
    cache: new InMemoryCache()
  });

const App = () => {
    return (
        <ApolloProvider client={client}>
            <StatusBar barStyle="dark-content" hidden />
            <NavigationContainer>
                <Stack.Navigator
                    //default screen is home
                    initialRouteName="Home"
                    //Zorgt ervoor dat er geen header is op default pagina
                   options={{
                        headerMode: 'false'
                    }}
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
                        ptions={{
                            headerTitleAlign: 'center',
                            headerTitle: 'Gegevens'
                        }}
                    >
                    </Stack.Screen>
                    <Stack.Screen
                        name="Inlog"
                        component={Inlog}
                        options={{
                            headerTitleAlign: 'center'
                        }}
                    >
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </ApolloProvider>
    );
};

export default App;