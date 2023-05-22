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
    mutation sportSchema($cookie: String, $sportSchema: sportSchemaInput) {
       sportSchema(cookie: $cookie, sportSchema: $sportSchema) {
            code
            message
        }
    }
`;
