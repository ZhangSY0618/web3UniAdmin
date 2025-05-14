import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloCient';
import UserList from './components/UserList';
import { Container, Typography } from '@mui/material';

const GraphQLCRUD: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          用户管理
        </Typography>
        <UserList />
      </Container>
    </ApolloProvider>
  );
};

export default GraphQLCRUD;