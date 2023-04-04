import {useQuery} from '@apollo/client';
import {gql} from '@apollo/client';

export const GET_STAPPEN = gql`
    query myAccount($cookie: String!) {
        myAccount(cookie: $cookie) {
            stappen{
                aantalStappen
            }
        }
    }
`;