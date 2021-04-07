import Image from 'next/image';
import style from './post-header.module.scss';

type Props = {
  title: string;
  image: string;
}

function PostHeader({ title, image }: Props) {
  return (
    <header className={style.header}>
      <h1>{title}</h1>
      <Image src={image} alt={title} width={200} height={150} />
    </header>
  );
}

export default PostHeader;