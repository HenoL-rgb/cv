import { gql } from "@apollo/client"

export const POSITIONS = gql`
  query positions {
    positions {
      id
      name
    }
  }
`