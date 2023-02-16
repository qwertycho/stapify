import React from 'react';
import { View, Text, Button } from 'react-native';
import Hartslag from '../models/Hartslag';

/*
    * De hartslag display is een aparte component die de hartslag weergeeft
    * @type {React.Component}
    * @memberof Hartslag
    * @example <Hartslag.HartslagDisplay />
*/
const HartslagDisplay = props => {
  const [hartslag, setHartslag] = React.useState(true);
  
//   vaag ding om de hartslag te updaten wanneer deze veranderd
  React.useEffect(() => {
    const interval = setInterval(() => {
      setHartslag(Hartslag.getHartslag());
      
    }, 1000);
    return () => clearInterval(interval);
  }, []);

//   we geven de hartslag weer
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Je huidige hartslag is: {hartslag}</Text>
    </View>
  );
}

export default HartslagDisplay;