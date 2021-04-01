import { useRouter } from 'next/router';

export default function SelectedClientProjectsPage() {
  const router = useRouter();

  return (
    <>
      <h1>Selected Client Projects Page</h1>
      <p>Client Id {router.query.id}</p>
      <p>Project Id {router.query.clientProjectId}</p>
    </>
  );
}