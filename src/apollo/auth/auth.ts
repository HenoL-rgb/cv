import { gql } from "@apollo/client"

export const USER_LOGIN = gql`
query Login($email: String!, $password: String!) {
    login(auth: {email: $email, password: $password}) {
      user {
        id
        created_at
        email
        is_verified
        profile {
          id
          first_name
          last_name
          avatar
        }
        role
      }
      access_token
    }
  }`

export const USER_REGISTER = gql`
 mutation Register($email: String!, $password: String!) {
  signup(auth: {email: $email, password: $password}) {
    user {
      id
      created_at
      email
      is_verified
      profile {
        id
        first_name
        last_name
        avatar
      }
      role
    }
    access_token
  }
}`