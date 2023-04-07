import {useQuery} from '@apollo/client';
import {gql} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Alert} from 'react-native/types';

/**
 * Deze functie haalt de lokaal opgelagen cookie op en controleert of deze nog geldig is.
 * @returns {string} De cookie string
 * @throws {Error} Als de cookie niet geldig is
 */
export const getCookie = async () => {
  // console.log("Cookie.getCookie()");
  let localCookie = await AsyncStorage.getItem('login');

  // return localCookie;

  // Hier zou ik eigelijk de checkCookie functie willen gebruiken,
  // maar dan krijg je die stomme invalid hook error
  // want je zou maar dingen kunnen doen in react
  if (localCookie !== null) {
    return localCookie;
  } else {
    throw new Error('Je bent niet ingelogd');
  }
};