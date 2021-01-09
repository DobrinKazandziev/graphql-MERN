import { gql } from '@apollo/client';

import { USER_INFO } from './fragments';

export const GET_PROFILE = gql`
  query {
    profile { ...userInfo }
  }
  ${USER_INFO}
`;
