import React, {useState} from 'react';
import {Button, Text, TextInput, View, StyleSheet} from 'react-native';

import DatePicker from 'react-native-date-picker'
import {useMutation, gql} from '@apollo/client';

import AsyncStorage from '@react-native-async-storage/async-storage';

// make a new user
export const CREATE_USER = gql`
  mutation createAccount($username: String!, $password: String!, $birthday: Date!) {
    createAccount(username: $username, password: $password, birthday: $birthday)
  }
`;

const Register = (props) => {
  const [formUsername, setFormUsername] = useState('Enter username');
  const [formPassword, setFormPassword] = useState('Enter password');

  //date picker model open and close
  const [formBirthday, setFormBirthday] = useState(new Date())
  const [open, setOpen] = useState(false)

//   het bericht dat wordt weergegeven wanneer op de knop word gedrukt
  const [state, setState] = useState('');

  //  make a new user
  const {loading, error, data} = useMutation(CREATE_USER, {
    variables: {username: formUsername, password: formPassword, birthday: formBirthday},
  });

  return (
    <View style={Styles.container}>
      <Text style={{fontSize: 20, marginBottom: 5}}>Username</Text>
      <TextInput
        style={Styles.textInput}
        onChangeText={usename => setFormUsername(usename)}
        value={formUsername}
        autoCapitalize="none"
        selectTextOnFocus={true}
      />
      <Text style={{fontSize: 20, marginBottom: 15, marginTop:15}}>Date of birth</Text>
      <Button 
        title="Birth date" 
        onPress={() => setOpen(true)} 
        color="#708090"
      ></Button>
      <DatePicker
        modal
        mode='date'
        open={open}
        date={formBirthday}
        onConfirm={(formBirthday) => {
          setOpen(false)
          setFormBirthday(formBirthday)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
      <Text style={{fontSize: 20, marginBottom: 5, marginTop: 20}}>Password</Text>
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
        title="Register"
        onPress={() => {

          console.log(formUsername)
          console.log(formPassword)
          console.log(formBirthday)

          if (!formUsername || !formPassword || !formBirthday) {
            setState('Some fields are empty, Please try again!');
          } 
          else if (formUsername == 'Enter username' || formPassword == 'Enter password' || formBirthday == new Date()) {
            setState('Some fields aren\'t changed, Please try again!');
          } else {
            if (loading) setState('Loading...');
            if (error) setState('Error :/');
            if (data.createAccount != 'false') {
              if (data.createAccount) {
                setState('Register succesfull!');

                // save the cookie string named login in the local storage
                AsyncStorage.setItem('login', data.createAccount);
                props.navigation.navigate('Home');
              }
            } else {
              setState('Username already exists, Please try again!');
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

export default Register;
