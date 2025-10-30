export interface Aparatur {
  id: number;
  image: string;
  name: string;
  position: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface AparatursResponses {
  current_page: number;
  data: Aparatur[];
  last_page: number;
  total: number;
  per_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  from: number;
  to: number;
  path: string;
}

export interface AparaturCreateRequest {
  image: File | null;
  name: string;
  position: string;
  description: string;
}

export interface AparaturUpdateRequest {
  id: number;
  image: File | null;
  name: string;
  position: string;
  description: string;
}