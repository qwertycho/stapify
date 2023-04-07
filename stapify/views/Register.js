import React, {useState} from 'react';
import {Button, Text, TextInput, View, StyleSheet, Alert} from 'react-native';

import DatePicker from 'react-native-date-picker';
import {useMutation, gql} from '@apollo/client';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {on} from '../fakers/hartslagF';

// make a new user
export const CREATE_USER = gql`
  mutation createAccount(
    $username: String!
    $password: String!
    $geboortedatum: String!
  ) {
    createAccount(
      username: $username
      password: $password
      geboortedatum: $geboortedatum
    )
  }
`;

const Register = props => {
  const [formUsername, setFormUsername] = useState('Enter username');
  const [formPassword, setFormPassword] = useState('Enter password');

  //date picker model open and close
  const [formBirthday, setFormBirthday] = useState(new Date());
  const [open, setOpen] = useState(false);

  //   het bericht dat wordt weergegeven wanneer op de knop word gedrukt
  const [state, setState] = useState('');

  //fomBirthday zonder tijd
  const date = formBirthday.toISOString().slice(0, 10);

  //  make a new user
  // juiste onzin voor een mutation
  const [createAccount, {data, loading, error}] = useMutation(CREATE_USER, {
    onCompleted: data => {
      console.log(data);
    }, onError: error => {
      console.log(error);
    }
  });

  const submit = () => {
    createAccount({
      variables: {
        username: formUsername,
        password: formPassword,
        geboortedatum: date,
      },
    });
  };

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
      <Text style={{fontSize: 20, marginBottom: 15, marginTop: 15}}>
        Date of birth
      </Text>
      <Button
        title="Birth date"
        onPress={() => setOpen(true)}
        color="#708090"></Button>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={formBirthday}
        onConfirm={formBirthday => {
          setOpen(false);
          setFormBirthday(formBirthday);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Text style={{fontSize: 20, marginBottom: 5, marginTop: 20}}>
        Password
      </Text>
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

          if (!formUsername || !formPassword || !formBirthday) {
            setState('Some fields are empty, Please try again!');
          } else if (
            formUsername == 'Enter username' ||
            formPassword == 'Enter password' ||
            formBirthday == new Date()
          ) {
            setState("Some fields aren't changed, Please try again!");
          } else {

            // de funkie die ding dingust aanroepen
            submit();
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
