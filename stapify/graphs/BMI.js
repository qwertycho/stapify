import {useQuery} from '@apollo/client';
import {gql} from '@apollo/client';

export const Set_BMI = gql`
    mutation setBMI($cookie: String!, $gewicht: Float!, $lengte: Float!) {
        setBMI(cookie: $cookie, gewicht: $gewicht, lengte: $lengte)
    }
`;