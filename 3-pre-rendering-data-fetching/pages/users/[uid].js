import useSWR from 'swr';

export default function UserIdPage({ userId }) {
  const { data, error } = useSWR(`https://jsonplaceholder.typicode.com/users/${userId}`);

  if (error) {
    return <p>Error.</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }
  
  return (
    <>
      <h1>UserId: {userId}</h1>
      <p>{data.name}</p>
      <p>{data.name}</p>
      <p>{data.username}</p>
      <p>{data.email}</p>
      <p>{data.address.street}</p>
      {/* {data.map((post) => (
        <div key={post.id}>
          <p>{post.userId}</p>
          <p>{post.id}</p>
          <p>{post.title}</p>
          <p>{post.body}</p>
          <br/>
        </div>
      ))} */}
    </>
  );
}

export async function getServerSideProps({ params }) {
  const userId = params.uid;
  return {
    props: {
      userId,
    },
  };
}
