import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_HELLO } from '../graphql/queries';

interface HelloData {
  hello: string;
}

const Hello: React.FC = () => {
  const { loading, error, data } = useQuery<HelloData>(GET_HELLO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <h1>{data?.hello}</h1>;
};

export default Hello;