import { gql } from '@apollo/client';

import { USER_INFO } from './fragments';

export const GET_PROFILE = gql`
  query {
    profile { ...userInfo }
  }
  ${USER_INFO}
`;

export const GET_PUBLIC_PROFILE = gql`
  query publicProfile($userName: String!) {
    publicProfile(userName: $userName) {
      _id
      userName
      fullName
      email
      images {
        url
        public_id
      }
      about
    }
  }
`;

export const GET_ALL_USERS = gql`
  query {
    allUsers { ...userInfo }
  }
  ${USER_INFO}
`

export const GET_ALL_POSTS = gql`
  query {
    allPosts {
      id
      title
      description
    }
  }
`
