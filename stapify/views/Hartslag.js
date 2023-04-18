import React, {useEffect} from 'react';
import {Button, Text, TextInput, View, StyleSheet, Alert} from 'react-native';

import {useQuery} from '@apollo/client';

import {GET_HARTSLAGEN} from '../graphs/Hartslagen';
import {getCookie} from '../models/Cookie';
import {CHECK_COOKIE} from '../graphs/Login';

import HartModel from '../models/Hartslagen';

/**
 * 
 * @param {*} props (Hartslag)
 * @returns Text Component
 * Deze functie genereert een tekst component met een aanrader voor Hartslag
 */
export const HartMessage = props => {
  const hartModel = new HartModel();
  return (
    <Text style={styles.aanrader}>
      {hartModel.getHartMessage(props.hartslag)}
    </Text>
  );
};

export default function Hartslag() {
  // haal cookie op
  const [cookie, setCookie] = React.useState('');
  const [TempCookie, setTempCookie] = React.useState('');

  const [Hartslag, setHartslag] = React.useState(0);

  const [status, setStatus] = React.useState('');

  // de functie voor het ophalen van de cookie
  // trademark copilot
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

  // de query voor het ophalen van de Hartslag
  // er word een check gedaan of de cookie leeg is
  const {loading, error, data} = useQuery(GET_HARTSLAGEN, {
    fetchPolicy: 'no-cache',
    variables: {cookie: cookie},
    skip: cookie === '',
    onCompleted: data => {
      if (data.myAccount.hartslag.hartslag === 0) {
        setStatus('Geen hartslag data');
        setHartslag(0);
      }
      // controleren of de hardslag data ouder is dan 5 minuten
      else if(data.myAccount.hartslag.tijd < new Date() - 300000)
      {
        setStatus('Geen recente hartslag data');
        setHartslag(0);
      }
      else {
        setStatus('Hartslag opgehaald');
        setHartslag(data.myAccount.hartslag.hartslag);
      }
    },
  });

  return (
    <View
      style={styles.container}
      async={async () => {
        const cookie = await getCookie();
        console.log(cookie);

        setCookie(cookie);
      }}>
      <Text style={styles.statusText}>{status}</Text>
      <Text style={styles.hartText}>Hartslag: {Hartslag}</Text>
      <HartMessage hartslag={Hartslag} />
    </View>
  );
}

const styles = StyleSheet.create({
  aanrader: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 50,
    width: '75%',
    marginLeft: '12.5%',
    padding: 20,
  },

  hartText: {
    fontSize: 26,
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 50,
    width: '50%',
    marginLeft: '25%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  statusText: {
    fontSize: 10,
    color: 'grey',
    textAlign: 'center',
    marginTop: 10,
  },
});
