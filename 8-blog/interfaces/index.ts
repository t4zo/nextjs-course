// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export interface User {
  id: number;
  name: string;
}

export interface IPost {
  slug: string;
  title: string;
  image: string;
  date: string;
  isFeatured: boolean;
  excerpt?: string;
  content?: string;
}

export interface IContact {
  email: string;
  name: string;
  message: string;
}

export interface INotification {
  title: string;
  message: string;
  status: string;
}