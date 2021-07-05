import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/client/react';

const client = new ApolloClient({ uri, cache });

function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
    </div>
  );
}

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
