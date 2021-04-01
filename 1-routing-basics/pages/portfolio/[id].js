import { useRouter } from 'next/router';

export default function PortfolioProjectPage() {
  const router = useRouter();

  console.log(router.pathname);
  console.log(router.query);

  return (
    <h1>Portfolio Project Page {router.query.id}</h1>
  )
}