import React, {useState} from 'react';
import {Button, Text, TextInput, View, StyleSheet} from 'react-native';

// import DatePicker from 'react-native-date-picker'
import {useQuery} from '@apollo/client';
import {gql} from '@apollo/client';

import AsyncStorage from '@react-native-async-storage/async-storage';

// get a cookie string named login
export const CHECK_USER = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

const Inlog = (props) => {
  const [formUsername, setFormUsername] = useState('Enter username');
  const [formPassword, setFormPassword] = useState('Enter password');

//   check of de gebruiker is ingelogd
    const checkLogin = async () => {
        try {
            const value = await AsyncStorage.getItem('login')
            if(value !== null) {
                props.navigation.navigate('Home');
            }
        } catch(e) {
            // error reading value
        }
    }

    checkLogin();

//   het bericht dat wordt weergegeven wanneer op de knop word gedrukt
  const [state, setState] = useState('');

  // login and get a cookie string named login
  const {loading, error, data} = useQuery(CHECK_USER, {
    variables: {username: formUsername, password: formPassword},
  });

  return (
    <View style={Styles.container}>
        <Text style={{fontSize: 20, marginBottom: 20}}>Login</Text>
      <TextInput
        style={Styles.textInput}
        onChangeText={usename => setFormUsername(usename)}
        value={formUsername}
        autoCapitalize="none"
        selectTextOnFocus={true}
      />
      <TextInput
        style={Styles.textInput}
        onChangeText={password => setFormPassword(password)}
        value={formPassword}
        autoCapitalize="none"
        selectTextOnFocus={true}
        secureTextEntry={true}
      />

      <Text>{state}</Text>

      <Button
        title="Login"
        onPress={() => {

          if (!formUsername || !formPassword) {
            setState('Some fields are empty, Please try again!');
          } 
          else if (formUsername == 'Enter username' || formPassword == 'Enter password') {
            setState('Some fields aren\'t changed, Please try again!');
          } else {
            if (loading) setState('Loading...');
            if (error) setState('Error :/');
            if (data.login != 'false') {
              if (data.login) {
                setState('Login succesfull!');

                // save the cookie string named login in the local storage
                AsyncStorage.setItem('login', data.login);
                props.navigation.navigate('Home');
              }
            } else {
              setState('Invalid username or password, Please try again!');
            }
          }
        }}
        color="#708090"
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
    textInput: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },

});

export default Inlog;
