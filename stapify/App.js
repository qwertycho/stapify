import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

//Components
import Home from './views/Home';
import Verwerk from './views/Verwerk';
import Inlog from './views/Inlog';
import Register from './views/Register';
import Sportschema from './views/Sportschema';
import Eetschema from './views/Eetschema';
import Stappen from './views/Stappen';
import Profiel from './views/Profiel';
import Hartslag from './views/Hartslag';

// Initialize Apollo Client without cache
const client = new ApolloClient({
  uri: 'https://schoolmoettestdomeinenhebben.nl/graphql',
  cache: new InMemoryCache(),
});

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <StatusBar barStyle="dark-content" hidden />
        <NavigationContainer>
          <Stack.Navigator
            //default screen is de inlog pagina, maar voor testen is de home pagina default
            initialRouteName="Inlog"
            //Zorgt ervoor dat er geen header is op default pagina
            options={{
              headerMode: 'false',
            }}>
            <Stack.Screen
              name="Home"
              component={Home}
              //geen header want dat is lelijk
              options={{
                headerMode: 'false',
              }}></Stack.Screen>
            <Stack.Screen
              name="Verwerk"
              component={Verwerk}
              ptions={{
                headerTitleAlign: 'center',
                headerTitle: 'Gegevens',
              }}></Stack.Screen>
            <Stack.Screen
              name="Inlog"
              component={Inlog}
              options={{
                headerTitleAlign: 'center',
              }}></Stack.Screen>
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerTitleAlign: 'center',
              }}></Stack.Screen>
            <Stack.Screen
              name="Sportschema"
              component={Sportschema}
              options={{
                headerTitleAlign: 'center',
              }}></Stack.Screen>
            <Stack.Screen
              name="Eetschema"
              component={Eetschema}
              options={{
                headerTitleAlign: 'center',
              }}></Stack.Screen>
            <Stack.Screen
              name="Stappen"
              component={Stappen}
              options={{
                headerTitleAlign: 'center',
              }}></Stack.Screen>
            <Stack.Screen
              name="Profiel"
              component={Profiel}
              options={{
                headerTitleAlign: 'center',
              }}></Stack.Screen>

            <Stack.Screen
              name="Hartslag"
              component={Hartslag}
              options={{
                headerTitleAlign: 'center',
              }}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </>
  );
};

export default App;
