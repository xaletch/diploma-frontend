import { useAllPermissions, useAnyPermission, usePermission } from "../model/hooks/permission.hook";

interface CanProps {
  permission: PermissionName | string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

const Can = ({ permission, fallback = null, children }: CanProps) => {
  const access = usePermission(permission);
  if (!access) return <>{fallback}</>
  return <>{children}</>
}

interface ICanProps {
  permissions: Array<PermissionName | string>;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

const CanAny = ({ permissions, fallback = null, children }: ICanProps) => {
  const access = useAnyPermission(permissions);
  if (!access) return <>{fallback}</>;
  return <>{children}</>;
}

const CanAll = ({ permissions, fallback = null, children }: ICanProps) => {
  const access = useAllPermissions(permissions);
  if (!access) return <>{fallback}</>;
  return <>{children}</>;
}

export { Can, CanAny, CanAll };
