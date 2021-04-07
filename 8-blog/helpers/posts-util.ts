import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from 'interfaces';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export function getPostsFiles() {
  return fs.readdirSync(postsDirectory)
}

export function getPostData(postIdentifier: string) : Post {
  const postSlug = postIdentifier.replace(/\.md$/, '');
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);


  const postData: Post = {
    slug: postSlug,
    ...data,
    content
  }

  return postData;
}

export function getAllPosts() : Post[] {
  const postsFiles = getPostsFiles();
  const posts = postsFiles.map(postFile => getPostData(postFile));

  const sortedPosts = posts.sort((postA: Post, postB: Post) => postA.date! > postB.date! ? -1 : 1);
  
  return sortedPosts;
}

export function getFeaturedPosts() : Post[] {
  const posts = getAllPosts();
  const featuredPosts = posts.filter(post => post.isFeatured);
  
  return featuredPosts;
}

export function getPost(slug: string) : Post {
  const posts = getAllPosts();
  const post = posts.filter(post => post.slug === slug)[0];
  
  return post;
}
