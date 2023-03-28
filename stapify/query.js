import { gql } from "@apollo/client";

export const account_query = gql`
    query account($username: String!) {
            accountID
            username
            geboortedatum
            aanmelddatum
    }
`;

export const Inlog_query = gql`
    query login($username: String, $password: String) {
        login(username: $username, password: $password)
    }
`;

export const accounts_query = gql`
    query accounts{
        accounts
        }
`;

export const login_query = gql`
    query login($username: String!, $password: String!) {
        login(username: $username, password: $password)
    }
`;

export const createAccount_mutation = gql`
    mutation createAccount($username: String!, $password: String!, $geboortedatum: String!) {
        createAccount(username: $username, password: $password, geboortedatum: $geboortedatum)
    }
`;
