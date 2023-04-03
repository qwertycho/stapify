import React, {useState} from 'react';
import {Button, Text, TextInput, View, StyleSheet, Alert} from 'react-native';

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

// export const CHECK_USER = gql`
//     query {login(username: "azertycho", password: "123")}`;

const Inlog = (props) => {
  const [formUsername, setFormUsername] = useState('enter username');
  const [formPassword, setFormPassword] = useState('');

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
});

export default Inlog;
