import type { Permission } from "./permission";

export interface Role {
  id: number;
  name: string;
  permissions?: Permission[];
  created_at: string;
  updated_at: string;
}

export interface RolesResponses {
  current_page: number;
  data: Role[];
  last_page: number;
  total: number;
  per_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  from: number;
  to: number;
  path: string;
}

export interface RoleCreateRequest {
  name: string;
  permission_ids?: number[];
}

export interface RoleUpdateRequest {
  id: number;
  name: string;
  permission_ids?: number[];
}
