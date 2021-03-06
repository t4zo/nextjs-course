import { IPost } from 'interfaces';
import PostItem from './PostItem';
import style from './posts.module.scss';

type Props = {
  posts: IPost[];
};

function Posts({ posts }: Props) {
  return (
    <ul className={style.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
}

export default Posts;
