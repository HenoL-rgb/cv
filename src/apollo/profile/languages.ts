import { gql } from "@apollo/client"

export const LANGUAGES = gql`
 query Language {
    languages {
      id
      created_at
      name
      iso2
      native_name
    }
  }`