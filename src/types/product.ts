import type { User } from "./user";

export interface Product {
  id: number;
  image: string;
  title: string;
  slug: string;
  content: string;
  owner: string;
  price: number;
  phone: string;
  address: string;
  user_id: number;
  user: User;
  created_at: string;
  updated_at: string;
}

export interface ProductsResponses {
  current_page: number;
  data: Product[];
  last_page: number;
  total: number;
  per_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  from: number;
  to: number;
  path: string;
}

export interface ProductCreateRequest {
  image: File | null;
  title: string;
  content: string;
  owner: string;
  price: number;
  phone: string;
  address: string;
}

export interface ProductUpdateRequest {
  id: number;
  image?: File | null; // optional
  title: string;
  content: string;
  owner: string;
  price: number;
  phone: string;
  address: string;
}
