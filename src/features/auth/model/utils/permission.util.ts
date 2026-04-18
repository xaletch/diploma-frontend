import type { IPermission, IRole, PermissionName } from "@/entities/account";

/**
  ===== ПРОВЕРКА НА КОНКРЕТНЫЕ РАЗРЕШЕНИЯ =====
**/
const hasPermission = (role: IRole, permissions: IPermission[], perm: PermissionName | string): boolean => {
  if (!role) return false;
  if (role === "owner") return true;
  return permissions.some(p => p.name === perm);
}

/**
  ===== ПРОВЕРКА НА ХОТЯБЫ ОДНО ПЕРЕДАННОЕ РАЗРЕШЕНИЕ =====
**/
const hasAnyPermission = (role: IRole, permissions: IPermission[], perms: Array<PermissionName | string>): boolean => {
  if (!role) return false;
  if (role === "owner") return true;

  return perms.some(perm => permissions.some(p => p.name === perm));
}

/**
  ===== ПРОВЕРКА ЕСТЬ ЛИ ВСЕ ПЕРЕДАННЫЕ РАЗРЕШЕНИЯ =====
**/
const hasAllPermissions = (role: IRole, permissions: IPermission[], perms: Array<PermissionName | string>): boolean => {
  if (!role) return false;
  if (role === "owner") return true;

  return perms.every(perm => permissions.some(p => p.name === perm));
}

/**
  ===== ПРОВЕРКА РАЗРЕШЕНИЙ =====
**/
const hasWildcardPermissions = (role: IRole, permissions: IPermission[], pattern: string,): boolean => {
  if (!role) return false;
  if (role === "owner") return true;
  
  const reg = new RegExp("^" + pattern.replace("*", ".*") + "$");
  return permissions.some(p => reg.test(p.name));
}

export {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  hasWildcardPermissions,
};
