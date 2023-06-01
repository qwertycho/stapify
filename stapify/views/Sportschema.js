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

// dropdown
import SelectDropdown from 'react-native-select-dropdown';

export default function Sportschema() {
  const [cookie, setCookie] = React.useState('');
  const [TempCookie, setTempCookie] = React.useState('');

  const [status, setStatus] = React.useState('');

  const [schema, setSchema] = React.useState(null);
  const [sporten, setSporten] = React.useState(null);

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
        setStatus('Ingelogd');
        setCookie(TempCookie);
      } else {
        setStatus('Niet ingelogd');
      }
    },
  });

  class sport {
    constructor(sportID, sport) {
      this.sportID = sportID;
      this.sport = sport;
    }
  }

  class Schema {
    constructor(
      maandag,
      dinsdag,
      woensdag,
      donderdag,
      vrijdag,
      zaterdag,
      zondag,
    ) {
      this.maandag = maandag;
      this.dinsdag = dinsdag;
      this.woensdag = woensdag;
      this.donderdag = donderdag;
      this.vrijdag = vrijdag;
      this.zaterdag = zaterdag;
      this.zondag = zondag;
    }
  }

  function matchSport(sportID, sporten) {
    if (sporten === null) return new sport(0, 'Geen sporten');
    for (let i = 0; i < sporten.length; i++) {
      if (sporten[i].sportID === sportID) {
        return new sport(sporten[i].sportID, sporten[i].sport);
      }
    }
  }

  const {loading, error, data} = useQuery(GET_SPORTSCHEMA, {
    variables: {cookie: cookie},
    skip: cookie === '',
    cache: false,
    onCompleted: data => {
      if (data.myAccount.sportSchema === null || data.sporten === null) {
        setStatus('Geen sportschema');
        // setSchema(null);
      } else {
        setStatus('Sportschema gevonden');

        setSporten(data.sporten);

        let Nschema = new Schema(
          matchSport(data.myAccount.sportSchema.maandag, data.sporten),
          matchSport(data.myAccount.sportSchema.dinsdag, data.sporten),
          matchSport(data.myAccount.sportSchema.woensdag, data.sporten),
          matchSport(data.myAccount.sportSchema.donderdag, data.sporten),
          matchSport(data.myAccount.sportSchema.vrijdag, data.sporten),
          matchSport(data.myAccount.sportSchema.zaterdag, data.sporten),
          matchSport(data.myAccount.sportSchema.zondag, data.sporten),
        );

        setSchema(Nschema);
      }
    },
  });

  const [updateSportSchema, {loading1, error1, data1}] = useMutation(
    UPDATE_SPORTSCHEMA,
    {
      onCompleted: data => {
        setStatus('Sportschema geupdate');
      },
    },
  );

  function updateSchema(dag, sportID) {
    setStatus('Sportschema wordt geupdate');

    schema[dag] = matchSport(sportID, sporten);

    updateSportSchema({
      variables: {
        cookie: cookie,
        maandag: schema.maandag.sportID,
        dinsdag: schema.dinsdag.sportID,
        woensdag: schema.woensdag.sportID,
        donderdag: schema.donderdag.sportID,
        vrijdag: schema.vrijdag.sportID,
        zaterdag: schema.zaterdag.sportID,
        zondag: schema.zondag.sportID,
      },
    });
  }

  return (
    <ScrollView>
      <Text>{status}</Text>
      <Text>Sportschema</Text>

      {schema !== null ? (
        <View style={styles.container}>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.text}>Maandag</Text>
              <SelectDropdown
                data={sporten.map(sport => sport.sport)}
                onSelect={(selectedItem, index) => {
                  updateSchema('maandag', sporten[index].sportID);
                }}
                defaultButtonText={schema.maandag.sport}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.text}>Dinsdag</Text>
              <SelectDropdown
                data={sporten.map(sport => sport.sport)}
                onSelect={(selectedItem, index) => {
                  updateSchema('dinsdag', sporten[index].sportID);
                }}
                defaultButtonText={schema.dinsdag.sport}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.text}>Woensdag</Text>
              <SelectDropdown
                data={sporten.map(sport => sport.sport)}
                onSelect={(selectedItem, index) => {
                  updateSchema('woensdag', sporten[index].sportID);
                }}
                defaultButtonText={schema.woensdag.sport}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.text}>Donderdag</Text>
              <SelectDropdown
                data={sporten.map(sport => sport.sport)}
                onSelect={(selectedItem, index) => {
                  updateSchema('donderdag', sporten[index].sportID);
                }}
                defaultButtonText={schema.donderdag.sport}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.text}>Vrijdag</Text>
              <SelectDropdown
                data={sporten.map(sport => sport.sport)}
                onSelect={(selectedItem, index) => {
                  updateSchema('vrijdag', sporten[index].sportID);
                }}
                defaultButtonText={schema.vrijdag.sport}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.text}>Zaterdag</Text>
              <SelectDropdown
                data={sporten.map(sport => sport.sport)}
                onSelect={(selectedItem, index) => {
                  updateSchema('zaterdag', sporten[index].sportID);
                }}
                defaultButtonText={schema.zaterdag.sport}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.text}>Zondag</Text>
              <SelectDropdown
                data={sporten.map(sport => sport.sport)}
                onSelect={(selectedItem, index) => {
                  updateSchema('zondag', sporten[index].sportID);
                }}
                defaultButtonText={schema.zondag.sport}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
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
