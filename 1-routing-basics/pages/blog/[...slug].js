import { useRouter } from 'next/router';

export default function BlogPostPage() {
  const router = useRouter();

  return (
    <>
      <h1>Blog Post Page</h1>
      <p>Slugs {router.query.slug}</p>
    </>
  );
}