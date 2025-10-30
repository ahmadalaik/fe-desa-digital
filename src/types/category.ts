export interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface CategoriesResponses {
  current_page: number;
  data: Category[];
  last_page: number;
  total: number;
  per_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  from: number;
  to: number;
  path: string;
}

export interface CategoryCreateRequest {
  name: string;
}

export interface CategoryUpdateRequest {
  id: number;
  name: string;
}
