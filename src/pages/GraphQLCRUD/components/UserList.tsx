import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_HELLO, GET_ITEMS, ADD_ITEM } from '../graphql/queries';
import { Item } from '../types';

const List: React.FC = () => {
  const [newItemText, setNewItemText] = useState('');
  const { loading: helloLoading, error: helloError, data: helloData } = useQuery<{ hello: string }>(GET_HELLO);
  const { loading: itemsLoading, error: itemsError, data: itemsData, refetch } = useQuery<{ getItems: Item[] }>(GET_ITEMS);
  const [addItem] = useMutation<{ addItem: Item }, { text: string }>(ADD_ITEM, {
    onCompleted: () => refetch(), // 添加后刷新列表
  });

  const handleAddItem = async () => {
    if (!newItemText) return;
    try {
      await addItem({ variables: { text: newItemText } });
      setNewItemText(''); // 清空输入
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  if (helloLoading || itemsLoading) return <p>Loading...</p>;
  if (helloError) return <p>Error (hello): {helloError.message}</p>;
  if (itemsError) return <p>Error (items): {itemsError.message}</p>;

  return (
    <div>
      <h1>Hello: {helloData?.hello || 'No data'}</h1>
      <h2>Todo List</h2>
      <input
        value={newItemText}
        onChange={(e) => setNewItemText(e.target.value)}
        placeholder="Add new item"
      />
      <button onClick={handleAddItem}>Add</button>
      <ul>
        {itemsData?.getItems.map((item: Item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default List;