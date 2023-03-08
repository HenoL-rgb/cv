import { gql } from "@apollo/client"

export const USER_INFO = gql`
query User($id: ID!) {
    user(id: $id) {
        email
    }
  }`