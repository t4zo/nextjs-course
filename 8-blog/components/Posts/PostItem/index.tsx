import { IPost } from 'interfaces';
import Image from 'next/image';
import Link from 'next/link';

import style from './post-item.module.scss';

type Props = {
  post: IPost;
}

function PostItem({ post }: Props) {
  const formattedDate = new Date(post.date).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const imagePath = `/images/posts/${post.slug}/${post.image}`;
  const linkPath = `/posts/${post.slug}`;

  return (
    <li className={style.post}>
      <Link href={linkPath}>
        <a>
          <div className={style.image}>
            <Image src={imagePath} alt={post.title} width={300} height={200} layout='responsive' />
          </div>
          <div className={style.content}>
            <h3>{post.title}</h3>
            <time>{formattedDate}</time>
            <p>{post.excerpt}</p>
          </div>
        </a>
      </Link>
    </li>
  );
}

export default PostItem;