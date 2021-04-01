import Link from 'next/link';

export default function ClientsPage() {
  const clients = [
    { id: 'max', name: 'Max' },
    { id: 'tacio', name: 'Tacio' },
  ];

  return (
    <>
      <h1>Clients Page</h1>

      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <Link href={{
              pathname: '/clients/[id]',
              query: {id: client.id}
            }}>
              <a>Clients {client.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
