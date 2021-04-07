import Layout from 'components/Layout';
import Hero from 'components/Hero';
import Posts from 'components/Posts';

import { Post } from 'interfaces';
import styles from './featured-posts.module.scss';
import { getFeaturedPosts } from 'helpers/posts-util';

type Props = {
  posts: Post[];
}

function HomePage({ posts }: Props) {
  return (
    <Layout title='NBlog'>
      <Hero />
      <section className={styles.latest}>
        <h2>Featured Posts</h2>
        <Posts posts={posts} />
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getFeaturedPosts();

  return {
    props: {
      posts
    },
    // revalidate: 3600
  }
}

export default HomePage;
