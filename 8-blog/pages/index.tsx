import FeaturedPosts from 'components/FeaturedPosts';
import Hero from 'components/Hero';
import Layout from 'components/Layout';

function HomePage() {
  return (
    <Layout title='Home | Next.js + TypeScript Example'>
      <Hero />
      <FeaturedPosts />
    </Layout>
  );
};

export default HomePage;
