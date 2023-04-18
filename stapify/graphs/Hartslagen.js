import {useQuery} from '@apollo/client';
import {gql} from '@apollo/client';

export const GET_HARTSLAGEN = gql`
    query myAccount($cookie: String!) {
        myAccount(cookie: $cookie) {
            hartslag{
                hartslag
                tijd
            }
        }
    }
`;