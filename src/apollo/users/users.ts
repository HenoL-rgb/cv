import { gql } from "@apollo/client";

export const USERS = gql`
    query GetUsers {
        users {
            email,
            id,
            profile {
                first_name,
                last_name,
                avatar
            },
            department {
                name,
            },
            position {
                name,
            }           
        }
        
    }
`