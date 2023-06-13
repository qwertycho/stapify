import {gql} from '@apollo/client';

export const GET_WEDSTRIJD = gql`
  query wedstrijd($start: String!, $end: String!) {
    wedstrijd(start: $start, end: $end) {
      accountID
      username
      score
    }
  }
`;
