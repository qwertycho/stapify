import { gql } from '@apollo/client';

// SportSchemaInput
export const SPORTSCHEMA_INPUTTYPE = gql`
    input sportSchemaInput {
        maandag: Int,
        dinsdag: Int,
        woensdag: Int,
        donderdag: Int,
        vrijdag: Int,
        zaterdag: Int,
        zondag: Int
    }
`;

//sportSchema opvragen
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

//sportSchema updaten
export const UPDATE_EETSCHEMA = gql`
    mutation eetSchema($cookie: String, $sportSchema: sportSchemaInput) {
        sportSchema(cookie: $cookie, sportSchema: $sportSchema) {
            code
            message
        }
    }
`;