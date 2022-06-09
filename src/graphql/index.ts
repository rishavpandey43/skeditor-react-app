import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({});

const graphqlMainLink = new HttpLink({
  uri: 'http://template.dev.internal.skuad.in/graphql',
  credentials: 'include',
});

const graphqlMockLink = new HttpLink({
  uri: process.env.REACT_APP_API_GRAPHQL_MOCK_URL,
  credentials: 'include',
});

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = '';

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      'x-auth-legal-entity-id': token,
    },
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

export const client = new ApolloClient({
  cache,
  link: authLink.concat(
    ApolloLink.split(
      (operation) => operation.getContext().clientName === 'mock',
      graphqlMockLink, // <= apollo will send to this if clientName is "mock"
      graphqlMainLink, // <= otherwise will send to this
    ),
  ),
});

export default client;
