import {useQuery} from '@apollo/client';
import {gql} from '@apollo/client';

export const Set_BMI = gql`
    mutation bmi($cookie: String, $bmi: Float) {
        bmi(cookie: $cookie, bmi: $bmi) {
            code
            message
        }
    }
`;