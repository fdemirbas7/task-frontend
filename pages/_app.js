import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

import { WebSocketLink } from '@apollo/client/link/ws';
import { split, HttpLink } from '@apollo/client';

import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
let wsLink;
if (process.browser) {
  wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
      reconnect: true,
    },
  });
}

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const splitLink = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink
    )
  : httpLink;

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

export default MyApp;
