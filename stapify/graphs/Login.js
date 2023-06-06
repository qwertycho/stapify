import {useQuery} from '@apollo/client';
import {gql} from '@apollo/client';

export const CHECK_COOKIE = gql`
    query cookie($cookie: String!) {
        cookie(cookie: $cookie)
    }
`;

export const LOGIN = gql`
    query login($username: String!, $password: String!) {
        login(username: $username, password: $password)
    }
`;


export const GET_USERDATA =
gql`
    query myAccount($cookie: String!) {
        myAccount(cookie: $cookie) {
           username
           geboortedatum
           aanmelddatum
        }
    }
`;