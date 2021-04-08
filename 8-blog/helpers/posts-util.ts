import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { IPost } from 'interfaces';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export function getPostsFiles() {
  return fs.readdirSync(postsDirectory)
}

export function getPostData(postIdentifier: string) : IPost {
  const postSlug = postIdentifier.replace(/\.md$/, '');
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);


  const postData: IPost = {
    slug: postSlug,
    title: data.title,
    image: data.image,
    date: data.date,
    isFeatured: data.isFeatured,
    content
  }

  return postData;
}

export function getAllPosts() : IPost[] {
  const postsFiles = getPostsFiles();
  const posts = postsFiles.map(postFile => getPostData(postFile));

  const sortedPosts = posts.sort((postA: IPost, postB: IPost) => postA.date! > postB.date! ? -1 : 1);
  
  return sortedPosts;
}

export function getFeaturedPosts() : IPost[] {
  const posts = getAllPosts();
  const featuredPosts = posts.filter(post => post.isFeatured);
  
  return featuredPosts;
}

export function getPost(slug: string) : IPost {
  const posts = getAllPosts();
  const post = posts.filter(post => post.slug === slug)[0];
  
  return post;
}
