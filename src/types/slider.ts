export interface Slider {
  id: number;
  image: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface SlidersResponses {
  current_page: number;
  data: Slider[];
  last_page: number;
  total: number;
  per_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  from: number;
  to: number;
  path: string;
}

export interface SliderCreateRequest {
  image: File | null;
  description: string;
}
