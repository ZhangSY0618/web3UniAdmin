import React, { useState, useEffect } from 'react';

interface HelloResponse {
  data?: {
    hello: string;
  };
  errors?: any[];
}

const Dashboard: React.FC = () => {
  const [greeting, setGreeting] = useState<string | null>(null);
  const workerUrl = 'https://my-graphql-app.zhangshengyao0618.workers.dev/graphql'; // 替换为你的 Worker URL

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const response = await fetch(workerUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query {
                hello
              }
            `,
          }),
        });

        const result: HelloResponse = await response.json();

        if (result.data?.hello) {
          setGreeting(result.data.hello);
        } else if (result.errors) {
          console.error('GraphQL Errors:', result.errors);
          setGreeting('Failed to fetch greeting.');
        }
      } catch (error) {
        console.error('Error fetching from worker:', error);
        setGreeting('Failed to connect to worker.');
      }
    };

    fetchGreeting();
  }, [workerUrl]);

  return (
    <div>
      <h1>My React App</h1>
      {greeting && <p>Greeting from Worker: {greeting}</p>}
      {!greeting && <p>Loading greeting...</p>}
    </div>
  );
};



export default Dashboard;