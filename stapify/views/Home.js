import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Menu from './Menu';

const Home = props => {
  const navigeerSport = () => {
    props.navigation.navigate('Sportschema');
  };
  const navigeerEten = () => {
    props.navigation.navigate('Eetschema');
  };
  const navigeerStappen = () => {
    props.navigation.navigate('Stappen');
  };
  const navigeerHartslagen = () => {
    props.navigation.navigate('Hartslag');
  };

  return (
    <ScrollView>
      <View style={Styles.container}>
        <Image
          style={Styles.stapifyLogo}
          source={require('../images/stapifyLogo.png')}
        />
        <Text style={Styles.title}>Stapify</Text>
        <Text style={Styles.subtitle}>{props.username}</Text>
        <View style={Styles.textcontainer}>
          <Text style={Styles.content}>{introText}</Text>
        </View>
        <View>
          <TouchableOpacity style={Styles.NavBox} onPress={navigeerSport}>
            <Text style={Styles.title}>Sportschema</Text>
            <Text style={Styles.text}>
              Klik om naar jouw Sportschema te gaan{' '}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={Styles.NavBox} onPress={navigeerEten}>
            <Text style={Styles.title}>Eetschema</Text>
            <Text style={Styles.text}>
              Klik om naar jouw Eetschema te gaan{' '}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={Styles.NavBox} onPress={navigeerStappen}>
            <Text style={Styles.title}>Stappen</Text>
            <Text style={Styles.text}>Klik om naar jouw Stappies te gaan </Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={Styles.NavBox} onPress={navigeerHartslagen}>
            <Text style={Styles.title}>Hartslag</Text>
            <Text style={Styles.text}>
              Klik om naar jouw Hartslagen te gaan{' '}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={Styles.ruimte}></View>
        <View style={Styles.Menu}>
          <Menu />
        </View>
      </View>
    </ScrollView>
  );
};

const introText = `Stapify is een app die je helpt om meer te bewegen. Door middel van een stappenteller en een aantal adviezen, word je aangemoedigd om meer te bewegen.`;

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
  },
  textcontainer: {
    padding: 20,
  },
  stapifyLogo: {
    marginTop: 20,
    marginBottom: 20,
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 5,
  },
  Menu: {
    position: 'absolute',
    bottom: 10,
  },
  NavBox: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
    width: 300,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  ruimte: {
    //voor de ruimte onder de menuknop, ik weet dat dit niet de beste manier is, maar ik begin er een beetje klaar mee te zijn
    height: 100,
  },
});

export default Home;
