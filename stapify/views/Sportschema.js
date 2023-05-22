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
import {
  GET_EETSCHEMA,
  UPDATE_EETSCHEMA,
  CREATE_ACCOUNT,
} from '../graphs/Sportschema';
import {ScrollView, TextInput} from 'react-native-gesture-handler';

export default function Sportschema() {
  const [cookie, setCookie] = React.useState('');
  const [TempCookie, setTempCookie] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [sporttSchema, setSportSchema] = React.useState(null);

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
  const {loading, error, data} = useQuery(GET_EETSCHEMA, {
    variables: {cookie: cookie},
    skip: cookie === '',
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      if (data.myAccount.eetSchema === null) {
        setStatus('Geen eetschema');
        setEetSchema(null);
      } else {
        setStatus('Sportschema opgehaald');
        setEetSchema(data.myAccount.eetSchema);
      }
    },
  });

  return (
    <View >
      <Text >Sportschema</Text>
      <Text >Hier komt het sportschema</Text>
    </View>
  );
}


