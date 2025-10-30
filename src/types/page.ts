export interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface PagesResponses {
  current_page: number;
  data: Page[];
  last_page: number;
  total: number;
  per_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  from: number;
  to: number;
  path: string;
}

export interface PageCreateRequest {
  title: string;
  content: string;
}

export interface PageUpdateRequest {
  id: number;
  title: string;
  content: string;
}
