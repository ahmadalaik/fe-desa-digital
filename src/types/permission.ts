export interface Permission {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface PermissionsResponses {
  current_page: number;
  data: Permission[];
  last_page: number;
  total: number;
  per_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  from: number;
  to: number;
  path: string;
}

export interface PermissionCreateRequest {
  name: string;
}

export interface PermissionUpdateRequest {
  name: string;
}
