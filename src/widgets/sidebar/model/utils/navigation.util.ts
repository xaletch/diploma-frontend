export const isRouteActive = (currentPath: string, routePath: string): boolean => {
  if (routePath === '/') return currentPath === '/';
  return currentPath.startsWith(routePath);
};
