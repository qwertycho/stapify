import React, {useEffect} from 'react';
import {Button, Text, TextInput, View, StyleSheet, Alert} from 'react-native';

import {useQuery} from '@apollo/client';

import {GET_STAPPEN} from '../graphs/Stappen';
import {getCookie} from '../models/Cookie';
import {CHECK_COOKIE} from '../graphs/Login';

import StapModel from '../models/Stappen';

/**
 * 
 * @param {*} props (stappen)
 * @returns Text Component
 * Deze functie genereert een tekst component met een aanrader voor stappen
 */
export const StapMessage = props => {
  const stapModel = new StapModel();
  return (
    <Text style={styles.aanrader}>
      {stapModel.getStepMessage(props.stappen)}
    </Text>
  );
};

export default function Stappen() {
  // haal cookie op
  const [cookie, setCookie] = React.useState('');
  const [TempCookie, setTempCookie] = React.useState('');

  const [stappen, setStappen] = React.useState(0);

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

  // de query voor het ophalen van de stappen
  // er word een check gedaan of de cookie leeg is
  const {loading, error, data} = useQuery(GET_STAPPEN, {
    fetchPolicy: 'no-cache',
    variables: {cookie: cookie},
    skip: cookie === '',
    onCompleted: data => {
      if (data.myAccount.stappen.aantalStappen === 0) {
        setStatus('Geen stappen');
        setStappen(0);
      } else {
        setStatus('Stappen opgehaald');
        setStappen(data.myAccount.stappen.aantalStappen);
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
      <Text style={styles.stapText}>Stappen: {stappen}</Text>
      <StapMessage stappen={stappen} />
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

  stapText: {
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
