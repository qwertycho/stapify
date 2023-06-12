
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import {ApolloError, useMutation, useQuery} from '@apollo/client';
import {getCookie} from '../models/Cookie';
import {CHECK_COOKIE} from '../graphs/Login';

import {ScrollView, TextInput} from 'react-native-gesture-handler';
import { GET_WEDSTRIJD } from '../graphs/Wedstrijd';

export default function Wedstrijd() {
  const [cookie, setCookie] = React.useState('');
  const [TempCookie, setTempCookie] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [Wedstrijd, setWedstrijd] = React.useState(null);

  useEffect(() => {
    async function fetchData() {
      const cookie = await getCookie();
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
        setCookie(TempCookie);
      } else {
        setStatus('Niet ingelogd');
      }
    },
  });

  // er word een check gedaan of de cookie leeg is
  // fetchPolicy: 'no-cache' zorgt ervoor dat de data niet wordt opgeslagen in de cache
  // zo word er altijd een nieuwe query gedaan
  const {loading, error, data} = useQuery(GET_WEDSTRIJD, {
    variables: {start: '', end: ''},
    skip: cookie === '',
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      if (data == null) {
        setStatus('Geen wedstrijd gevonden');
        setWedstrijd(null)
      } else {
        setStatus('wedstrijd opgehaald');
        console.log(data.wedstrijd)
        setWedstrijd(data.wedstrijd)
      }
    },
    onError: data => {
      console.log(data)
    },
  });

  return (
    <ScrollView>
      <Text>{status}</Text>
      <View style={styles.container}>
        {Wedstrijd != null ? (
          
          // map de data van de wedstrijd
          Wedstrijd.map((wedstrijd, index) => (
            <View key={index}>
              <Text style={styles.text}>Naam: {wedstrijd.username}</Text>
              <Text style={styles.text}>Score: {wedstrijd.score}</Text>
            </View>
          ))

        ) : (
          <Text style={styles.text}>Geen wedstrijd gevonden</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: 20,
    color: 'black',
  },

  statusText: {
    fontSize: 10,
    color: 'grey',
    textAlign: 'center',
    marginTop: 10,
  },
});

