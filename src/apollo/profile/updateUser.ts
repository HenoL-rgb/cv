import { gql } from "@apollo/client"

export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $user: UpdateUserInput!) {
    updateUser(id: $id, user: $user) {
      id
      profile {
        id
        first_name
        last_name
        full_name
        avatar
        skills {
          skill_name
          mastery
        }
        languages {
          language_name
          proficiency
        }
      }
      department {
        id
        name
      }
      position {
        id
        name
      }
    }
  }
`

export const UPDATE_EMPLOYEE = gql`
  mutation UPDATE_EMPLOYEE($id: ID!, $user: UpdateUserInput!) {
    updateUser(id: $id, user: $user) {
      id
      email
      profile {
        id
        first_name
        last_name
        avatar
        skills {
          skill_name
          mastery
        }
        languages {
          language_name
          proficiency
        }
      }
      cvs {
        id
        name
        description
      }
      position {
        id
        name
      }
      department {
        id
        name
      }
    }
  }
`