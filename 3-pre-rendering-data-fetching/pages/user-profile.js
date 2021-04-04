import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function UserProfilePage({ id, date, initialUser }) {
  const [user, setUser] = useState(initialUser);

  const { data, error } = useSWR(`https://jsonplaceholder.typicode.com/users/${id}`);

  useEffect(() => {
    if (data) {
        // const formattedUser = data.map(user => ({
        //   id: user.id,
        //   name: user.name,
        //   username: user.username,
        //   email: user.email,
        // }));

        const formattedUser = {
          id: data.id,
          name: data.name,
          username: data.username,
          email: data.email,
        };

        console.log('formattedUser');
        setUser(formattedUser);
    }
  }, [data]);

  if (error) {
    return <p>Error.</p>;
  }

  if (!data && !user) {
    return <p>Loading...</p>;
  }
  
  return (
    <>
      <h1>Id: {id}</h1>
      <p>{date}</p>
      <p>{user.id}</p>
      <p>{user.name}</p>
      <p>{user.username}</p>
      <p>{user.email}</p>
      {/* {users.map((user) => (
        <div key={user.id}>
          <p>{user.name}</p>
          <p>{user.username}</p>
          <p>{user.email}</p>
          <br/>
        </div>
      ))} */}
    </>
  );
}

export async function getStaticProps({ query, req, res }) {
  const id = 1;
  const blob = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const data = await blob.json();
  // const users = data.map(user => ({
  //   id: user.id,
  //   name: user.name,
  //   username: user.username,
  //   email: user.email,
  // }));

  return {
    props: {
      id,
      date: Date.now(),
      initialUser: data
    },
    revalidate: 10
  }
}