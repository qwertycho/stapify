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
} from '../graphs/EetSchema';
import {ScrollView, TextInput} from 'react-native-gesture-handler';

export default function Eetschema() {
  const [cookie, setCookie] = React.useState('');
  const [TempCookie, setTempCookie] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [eetSchema, setEetSchema] = React.useState(null);

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
        setStatus('Eetschema opgehaald');
        setEetSchema(data.myAccount.eetSchema);
      }
    },
  });

  const [updateEetSchema, {loading1, error1, data1}] = useMutation(
    UPDATE_EETSCHEMA,
    {
      onCompleted: data => {
        setStatus('Eetschema opgeslagen');
        console.log(data);
      },
      onError: error => {
        setStatus('Er is iets fout gegaan');
        Alert.alert('Er is iets fout gegaan');
        console.log(error);
      },
    },
  );

  const submit = () => {
    let schema = {
      maandag: eetSchema.maandag,
      dinsdag: eetSchema.dinsdag,
      woensdag: eetSchema.woensdag,
      donderdag: eetSchema.donderdag,
      vrijdag: eetSchema.vrijdag,
      zaterdag: eetSchema.zaterdag,
      zondag: eetSchema.zondag,
    };

    updateEetSchema({
      variables: {
        cookie: cookie,
        eetSchema: schema,
      },
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Eetschema</Text>
        <Text style={styles.statusText}>{status}</Text>

        {/* controleren of niet null */}
        {eetSchema !== null ? (
          <View>
            {/* table met de dagen en inputs met de waarde*/}
            <View style={styles.table}>
              <View style={styles.row}>
                <Text style={styles.text}>Maandag</Text>
                <TextInput
                  style={styles.input}
                  value={eetSchema.maandag}
                  onChangeText={text =>
                    setEetSchema({...eetSchema, maandag: text})
                  }
                />
              </View>

              <View style={styles.row}>
                <Text style={styles.text}>Dinsdag</Text>
                <TextInput
                  style={styles.input}
                  value={eetSchema.dinsdag}
                  onChangeText={text =>
                    setEetSchema({...eetSchema, dinsdag: text})
                  }
                />
              </View>

              <View style={styles.row}>
                <Text style={styles.text}>Woensdag</Text>
                <TextInput
                  style={styles.input}
                  value={eetSchema.woensdag}
                  onChangeText={text =>
                    setEetSchema({...eetSchema, woensdag: text})
                  }
                />
              </View>

              <View style={styles.row}>
                <Text style={styles.text}>Donderdag</Text>
                <TextInput
                  style={styles.input}
                  value={eetSchema.donderdag}
                  onChangeText={text =>
                    setEetSchema({...eetSchema, donderdag: text})
                  }
                />
              </View>

              <View style={styles.row}>
                <Text style={styles.text}>Vrijdag</Text>
                <TextInput
                  style={styles.input}
                  value={eetSchema.vrijdag}
                  onChangeText={text =>
                    setEetSchema({...eetSchema, vrijdag: text})
                  }
                />
              </View>

              <View style={styles.row}>
                <Text style={styles.text}>Zaterdag</Text>
                <TextInput
                  style={styles.input}
                  value={eetSchema.zaterdag}
                  onChangeText={text =>
                    setEetSchema({...eetSchema, zaterdag: text})
                  }
                />
              </View>

              <View style={styles.row}>
                <Text style={styles.text}>Zondag</Text>
                <TextInput
                  style={styles.input}
                  value={eetSchema.zondag}
                  onChangeText={text =>
                    setEetSchema({...eetSchema, zondag: text})
                  }
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                submit();
              }}
              style={styles.button}>
              <Text style={styles.text}>Opslaan</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.text}>Geen eetschema</Text>
        )}
      </View>
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

