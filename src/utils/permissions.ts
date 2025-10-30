import Cookies from "js-cookie";

export default function hasAnyPermission(permissions: string[]): boolean {
  const allPermissions = JSON.parse(
    Cookies.get("permissions") || "{}"
  ) as Record<string, boolean>;

  return permissions.some((permission) => allPermissions[permission]);
}
