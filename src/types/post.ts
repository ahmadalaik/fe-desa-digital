import type { Category } from "./category";
import type { User } from "./user";

export interface Post {
  id: number;
  image: string;
  title: string;
  slug: string;
  content: string;
  category_id: number;
  category: Category;
  user_id: number;
  user: User;
  created_at: string;
  updated_at: string;
}

export interface PostsResponses {
  current_page: number;
  data: Post[];
  last_page: number;
  total: number;
  per_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  from: number;
  to: number;
  path: string;
}

export interface PostCreateRequest {
  image: File | null; // file upload (form-data)
  title: string;
  content: string;
  category_id: number;
}

export interface PostUpdateRequest {
  id: number;
  image?: File | null; // optional
  title: string;
  content: string;
  category_id: number;
}
