import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Button,
  Touchable,
  TouchableOpacity,
} from 'react-native';

import {ApolloError, useMutation, useQuery} from '@apollo/client';
import {getCookie} from '../models/Cookie';
import {CHECK_COOKIE} from '../graphs/Login';
import {GET_SPORTSCHEMA, UPDATE_SPORTSCHEMA} from '../graphs/Sportschema';
import {ScrollView, TextInput} from 'react-native-gesture-handler';

export default function Sportschema() {
  const [cookie, setCookie] = React.useState('');
  const [TempCookie, setTempCookie] = React.useState('');

  const [status, setStatus] = React.useState('');

  const [schema, setSchema] = React.useState(null);

  // de functie voor het ophalen van de cookie
  // trademark copilot
  useEffect(() => {
    async function fetchData() {
      console.log('fetching data');
      const cookie = await getCookie();
      console.log(cookie);
      setTempCookie(cookie);
    }
    fetchData();
  }, []);

  // controleren of de cookie nog geldig is
  const {Cloading, Cerror, Cdata} = useQuery(CHECK_COOKIE, {
    variables: {cookie: TempCookie},
    skip: TempCookie === '',
    onCompleted: data => {
      if (data.cookie === true) {
        setStatus('Ingelogd');
        setCookie(TempCookie);
      } else {
        setStatus('Niet ingelogd');
      }
    },
  });

  class sport{
    constructor(sportID, sport){
      this.sportID = sportID;
      this.sport = sport;
    }
  }


  class Schema {
    constructor(maandag, dinsdag, woensdag, donderdag, vrijdag, zaterdag, zondag) {
      this.maandag = maandag;
      this.dinsdag = dinsdag;
      this.woensdag = woensdag;
      this.donderdag = donderdag;
      this.vrijdag = vrijdag;
      this.zaterdag = zaterdag;
      this.zondag = zondag;
    }
  }
    

  const {loading, error, data} = useQuery(GET_SPORTSCHEMA, {
    variables: {cookie: cookie},
    skip: cookie === '',
    onCompleted: data => {
      if (data.myAccount.sportSchema === null) {
        setStatus('Geen sportschema');
        setSchema(null);
      } else {
        setStatus('Sportschema');

        // tijdelijke workaround om de data in de textinput te krijgen terwijl de api nog niet geupdate is
        // dit moet wat netter worden met de sport class
        let schema = new Schema(
          data.myAccount.sportSchema.maandag,
          data.myAccount.sportSchema.dinsdag,
          data.myAccount.sportSchema.woensdag,
          data.myAccount.sportSchema.donderdag,
          data.myAccount.sportSchema.vrijdag,
          data.myAccount.sportSchema.zaterdag,
          data.myAccount.sportSchema.zondag,
        );

        setSchema(schema);
            }
    },
  });

  return (
    <ScrollView>
      <Text>{status}</Text>
      <Text>Sportschema</Text>

      {schema !== null ? (
        <View style={styles.container}>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.text}>Maandag</Text>
              <TextInput
                style={styles.input}
                value={String(schema.maandag)}
                onChangeText={text => {
                  setSchema({...schema, maandag: text});
                }}
              />
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.text}>Dinsdag</Text>
              <TextInput
                style={styles.input}
                value={String(schema.dinsdag)}
                onChangeText={text => {
                  setSchema({...schema, dinsdag: text});
                }}
              />
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.text}>Woensdag</Text>
              <TextInput
                style={styles.input}
                value={String(schema.woensdag)}
                onChangeText={text => {
                  setSchema({...schema, woensdag: text});
                }}
              />
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.text}>Donderdag</Text>
              <TextInput
                style={styles.input}
                value={String(schema.donderdag)}
                onChangeText={text => {
                  setSchema({...schema, donderdag: text});
                }}
              />
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.text}>Vrijdag</Text>
              <TextInput
                style={styles.input}
                value={String(schema.vrijdag)}
                onChangeText={text => {
                  setSchema({...schema, vrijdag: text});
                }}
              />
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.text}>Zaterdag</Text>
              <TextInput
                style={styles.input}
                value={String(schema.zaterdag)}
                onChangeText={text => {
                  setSchema({...schema, zaterdag: text});
                }}
              />
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.text}>Zondag</Text>
              <TextInput
                style={styles.input}
                value={String(schema.zondag)}
                onChangeText={text => {
                  setSchema({...schema, zondag: text});
                }}
              />
            </View>
          </View>
        </View>
      ) : (
        <Text>Geen sportschema</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 5,
    borderWidth: 1,
  },

  text: {
    fontSize: 20,
    color: 'black',
  },

  button: {
    margin: 10,
    padding: 10,
    width: '50%',
    backgroundColor: '#2196F3',
    borderRadius: 10,
  },

  statusText: {
    fontSize: 10,
    color: 'grey',
    textAlign: 'center',
    marginTop: 10,
  },
});
