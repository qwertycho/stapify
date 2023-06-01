import {useQuery} from '@apollo/client';
import {useMutation} from '@apollo/client';
import {gql} from '@apollo/client';

export const GET_SPORTSCHEMA = gql`
  query myAccount($cookie: String!) {
    myAccount(cookie: $cookie) {
      sportSchema {
        maandag
        dinsdag
        woensdag
        donderdag
        vrijdag
        zaterdag
        zondag
      }
    },
    sporten{
      sport,
      sportID
    }
  }
`;

// EetSchemaInput
export const SPORTSCHEMA_INPUTTYPE = gql`
  input EetSchemaInput {
    maandag: Int
    dinsdag: Int
    woensdag: Int
    donderdag: Int
    vrijdag: Int
    zaterdag: Int
    zondag: Int
  }
`;

export const UPDATE_SPORTSCHEMA = gql`
    mutation sportSchema($cookie: String, $maandag: Int, $dinsdag: Int, $woensdag: Int, $donderdag: Int, $vrijdag: Int, $zaterdag: Int, $zondag: Int) {
       sportSchema(cookie: $cookie, sportSchema: {
        maandag: $maandag
        dinsdag: $dinsdag
        woensdag: $woensdag
        donderdag: $donderdag
        vrijdag: $vrijdag
        zaterdag: $zaterdag
        zondag: $zondag
       }) {
            code
            message
        }
    }
`;
