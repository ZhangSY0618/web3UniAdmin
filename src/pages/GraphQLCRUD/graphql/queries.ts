import { gql } from '@apollo/client';

export const GET_HELLO = gql`
  query GetHello {
    hello
  }
`;

export const GET_ITEMS = gql`
  query GetItems {
    getItems {
      id
      text
    }
  }
`;

export const ADD_ITEM = gql`
  mutation AddItem($text: String!) {
    addItem(text: $text) {
      id
      text
    }
  }
`;