import React, {
    useState, 
    useEffect
} from 'react';

import {
  Text,
  View,
  StyleSheet,
  Alert,
  Button,
  Touchable,
  TouchableOpacity,
} from 'react-native';

import {
    ScrollView, 
    TextInput
} from 'react-native-gesture-handler';

import {
    ApolloError, 
    useMutation, 
    useQuery
} from '@apollo/client';

import {
    GET_SPORTSCHEMA,
    UPDATE_SPORTSCHEMA
} from '../graphs/SportSchema';

import { getCookie } from '../models/Cookie';
import {CHECK_COOKIE} from '../graphs/Login';


export default function Sportschema() {
    const [cookie, setCookie] = React.useState('');
    const [TempCookie, setTempCookie] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [sportSchema, setSportSchema] = React.useState(null);

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
  const {loading, error, data} = useQuery(GET_SPORTSCHEMA, {
    variables: {cookie: cookie},
    skip: cookie === '',
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      if (data.myAccount.sportSchema === null) {
        setStatus('Geen sportSchema');
        setSportSchema(null);
      } else {
        setStatus('SportSchema opgehaald');
        setSportSchema(data.myAccount.sportSchema);
      }
    },
  });

  const [updateSportSchema, {loading1, error1, data1}] = useMutation(
    UPDATE_SPORTSCHEMA,
    {
      onCompleted: data => {
        setStatus('Sportschema opgeslagen');
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
            maandag: sportSchema.maandag,
            dinsdag: sportSchema.dinsdag,
            woensdag: sportSchema.woensdag,
            donderdag: sportSchema.donderdag,
            vrijdag: sportSchema.vrijdag,
            zaterdag: sportSchema.zaterdag,
            zondag: sportSchema.zondag,
        };

        updateSportSchema({
            variables: {
            cookie: cookie,
            sportSchema: schema,
            },
        });
    };

    return (
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>SportSchema</Text>
            <Text style={styles.statusText}>{status}</Text>
    
            {/* controleren of niet null */}
            {sportSchema !== null ? (
              <View>
                {/* table met de dagen en inputs met de waarde*/}
                <View style={styles.table}>
                  <View style={styles.row}>
                    <Text style={styles.text}>Maandag</Text>
                    <TextInput
                      style={styles.input}
                      value={sportSchema.maandag}
                      onChangeText={text =>
                        setSportSchema({...sportSchema, maandag: text})
                      }
                    />
                  </View>
    
                  <View style={styles.row}>
                    <Text style={styles.text}>Dinsdag</Text>
                    <TextInput
                      style={styles.input}
                      value={sportSchema.dinsdag}
                      onChangeText={text =>
                        setSportSchema({...sportSchema, dinsdag: text})
                      }
                    />
                  </View>
    
                  <View style={styles.row}>
                    <Text style={styles.text}>Woensdag</Text>
                    <TextInput
                      style={styles.input}
                      value={sportSchema.woensdag}
                      onChangeText={text =>
                        setSportSchema({...sportSchema, woensdag: text})
                      }
                    />
                  </View>
    
                  <View style={styles.row}>
                    <Text style={styles.text}>Donderdag</Text>
                    <TextInput
                      style={styles.input}
                      value={sportSchema.donderdag}
                      onChangeText={text =>
                        setSportSchema({...sportSchema, donderdag: text})
                      }
                    />
                  </View>
    
                  <View style={styles.row}>
                    <Text style={styles.text}>Vrijdag</Text>
                    <TextInput
                      style={styles.input}
                      value={sportSchema.vrijdag}
                      onChangeText={text =>
                        setSportSchema({...sportSchema, vrijdag: text})
                      }
                    />
                  </View>
    
                  <View style={styles.row}>
                    <Text style={styles.text}>Zaterdag</Text>
                    <TextInput
                      style={styles.input}
                      value={sportSchema.zaterdag}
                      onChangeText={text =>
                        setSportSchema({...sportSchema, zaterdag: text})
                      }
                    />
                  </View>
    
                  <View style={styles.row}>
                    <Text style={styles.text}>Zondag</Text>
                    <TextInput
                      style={styles.input}
                      value={sportSchema.zondag}
                      onChangeText={text =>
                        setSportSchema({...sportSchema, zondag: text})
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
              <Text style={styles.text}>Geen SportSchema</Text>
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