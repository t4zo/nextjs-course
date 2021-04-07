import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import Layout from 'components/Layout';
import PostHeader from 'components/Posts/PostHeader';

import style from './post.module.scss';
import { getPostData, getPostsFiles } from 'helpers/posts-util';
import { IPost } from 'interfaces';
import Image from 'next/image';

type Props = {
  post: IPost;
};

function PostPage({ post }: Props) {
  const imagePostPath = '/images/posts';
  const imagePath = `${imagePostPath}/${post.slug}/${post.image!}`;

  const customRenders = {
    // image(image: any) {
    //   return <Image src={`${imagePostPath}/${post.slug}/${image.src}`} alt={image.alt} width={600} height={300} />;
    // },
    paragraph(paragraph: any) {
      const { node } = paragraph;
      if (node.children[0].type === 'image') {
        const image = node.children[0];
        
        return (
          <div className={style.image}>
            <Image src={`${imagePostPath}/${post.slug}/${image.url}`} alt={image.alt} width={600} height={300} layout='responsive' />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },
    code(code: any) {
      const { language, value } = code;
      return (
        <SyntaxHighlighter style={atomDark} language={language} children={value} />
      );
    }
  };

  return (
    <Layout title={`${post.title} | NBlog`}>
      <article className={style.content}>
        <PostHeader title={post.title!} image={imagePath} />
        <ReactMarkdown renderers={customRenders}>{post.content!}</ReactMarkdown>
      </article>
    </Layout>
  );
}

export function getStaticProps({ params }: any) {
  const { slug } = params;
  const post = getPostData(slug);

  return {
    props: {
      post,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postsFilenames = getPostsFiles();
  const slugs = postsFilenames.map((postFilename) => postFilename.replace(/\.md$/, ''));

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export default PostPage;
