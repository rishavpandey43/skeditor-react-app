import React from 'react';
import ReactDOM from 'react-dom/client';
import ContractTemplateEditor from './ContractTemplateEditor';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ContractTemplateEditor />
    </ApolloProvider>
  </React.StrictMode>,
);
