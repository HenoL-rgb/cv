import { gql } from "@apollo/client"

export const USER_INFO = gql`
query User($id: ID!) {
    user(id: $id) {
        email
        profile {
          id
          first_name
          last_name
          created_at
          avatar
          languages {
              language_name
              proficiency
            }
        }
        department {
          name
          id
        }
        position {
        name
        id
        }
        department_name
        position_name
    }
  }`