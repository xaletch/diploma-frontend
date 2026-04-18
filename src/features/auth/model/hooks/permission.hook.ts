import { accountSelector, type IPermission, type IRole } from "@/entities/account"
import { useSelector } from "react-redux"
import { hasAllPermissions, hasAnyPermission, hasPermission, hasWildcardPermissions } from "../utils/permission.util";
import type { PermissionName } from "@/entities/account"

interface UsePermissionReturnProps {
  has: (perm: PermissionName | string) => boolean;
  hasAny: (perms: Array<PermissionName | string>) => boolean;
  hasAll: (perms: Array<PermissionName | string>) => boolean;
  hasWildcard: (pattern: string) => boolean;
  permissions: IPermission[] | null;
  role: IRole | null;
}

export const usePermission = (permission: PermissionName | string): boolean => {
  const { account, permissions } = useSelector(accountSelector);
  
  if (!account || !permissions) return false;
  return hasPermission(account.role, permissions, permission);
};

export const useAnyPermission = (perms: Array<PermissionName | string>): boolean => {
  const { account, permissions } = useSelector(accountSelector);
  
  if (!account || !permissions) return false;
  return hasAnyPermission(account.role, permissions, perms);
};

export const useAllPermissions = (perms: Array<PermissionName | string>): boolean => {
  const { account, permissions } = useSelector(accountSelector);
  
  if (!account || !permissions) return false;
  return hasAllPermissions(account.role, permissions, perms);
};

export const useWildcardPermission = (pattern: PermissionName | string): boolean => {
  const { account, permissions } = useSelector(accountSelector);
  
  if (!account || !permissions) return false;
  return hasWildcardPermissions(account.role, permissions, pattern);
};

export const usePermissions = (): UsePermissionReturnProps => {
  const { account, permissions } = useSelector(accountSelector);

  const has = (perm: PermissionName | string): boolean => {
    if (!account || !permissions) return false;
    return hasPermission(account.role, permissions, perm);
  }

  const hasAny = (perms: Array<PermissionName | string>): boolean => {
    if (!account || !permissions) return false;
    return hasAnyPermission(account.role, permissions, perms);
  }

  const hasAll = (perms: Array<PermissionName | string>): boolean => {
    if (!account || !permissions) return false;
    return hasAllPermissions(account.role, permissions, perms)
  }

  const hasWildcard = (pattern: string): boolean => {
    if (!account || !permissions) return false;
    return hasWildcardPermissions(account.role, permissions, pattern);
  }

  return {
    has,
    hasAny,
    hasAll,
    hasWildcard,
    permissions,
    role: account!.role ?? null,
  }
}
