import {useQuery} from '@apollo/client';
import {useMutation} from '@apollo/client';
import {gql} from '@apollo/client';

export const GET_EETSCHEMA = gql`
  query myAccount($cookie: String!) {
    myAccount(cookie: $cookie) {
      eetSchema {
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
export const EETSCHEMA_INPUTTYPE = gql`
  input EetSchemaInput {
    maandag: String
    dinsdag: String
    woensdag: String
    donderdag: String
    vrijdag: String
    zaterdag: String
    zondag: String
  }
`;



export const UPDATE_EETSCHEMA = gql`
    mutation eetSchema($cookie: String, $eetSchema: eetSchemaInput) {
       eetSchema(cookie: $cookie, eetSchema: $eetSchema) {
            code
            message
        }
    }
`;

export const CREATE_ACCOUNT = gql`
    mutation createAccount($username: String, $geboortedatum: String, $password: String) {
        createAccount(username: $username, geboortedatum: $geboortedatum, password: $password)
    }
`;
