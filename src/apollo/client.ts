import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://cv-project-js.inno.ws/api/graphql",
    cache: new InMemoryCache()
})

export default client;