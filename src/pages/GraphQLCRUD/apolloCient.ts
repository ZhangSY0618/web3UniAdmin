import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://my-graphql-app.zhangshengyao0618.workers.dev/graphql', // 替换为你的 Workers 端点
  }),
  cache: new InMemoryCache(),
});

export default client;