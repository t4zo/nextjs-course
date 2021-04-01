import { useRouter } from 'next/router';

export default function ClientProjectsPage() {
  const router = useRouter();

  function loadProjectHandler() {
    // load data...
    // router.push('/clients/max/Project A');
    router.push({
      pathname: '/clients/[id]/[clientProjectId]',
      query: {id: 'max', clientProjectId: 'Project A'}
    });
  }

  return (
    <>
      <h1>Client Projects Page {router.query.id}</h1>

      <button onClick={loadProjectHandler}>Load Project A</button>
    </>
  );
}
