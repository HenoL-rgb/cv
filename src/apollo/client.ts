import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { offsetLimitPagination } from "@apollo/client/utilities";


const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const _retrieveToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        // We have data!!
        return value;
      }
    } catch (error) {
      // Error retrieving data
    }
    return '';
  };
  

  const token = await _retrieveToken();
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = createHttpLink({
    uri: "https://cv-project-js.inno.ws/api/graphql"
})

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        users: offsetLimitPagination(),
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default client;
