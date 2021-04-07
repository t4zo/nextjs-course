import Layout from "components/Layout";
import Posts from 'components/Posts';
import { getAllPosts } from "helpers/posts-util";

import { IPost } from "interfaces";

import styles from './posts.module.scss';

type Props = {
  posts: IPost[];
}

function PostsPage({ posts }: Props) {
  return (
    <Layout title='Postagens | NBlog'>
      <section className={styles.posts}>
      <h1>All Posts</h1>
      <Posts posts={posts} />
    </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();

  return {
    props: {
      posts
    },
    // revalidate: 3600
  }
}

export default PostsPage;