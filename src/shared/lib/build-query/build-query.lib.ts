export const buildQuery = (base: string, params: Record<string, string | number | undefined | null>): string => {
  const query = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return query ? `${base}?${query}` : base;
};
