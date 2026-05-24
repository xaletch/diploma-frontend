export const omitNullValues = <T extends Record<string, unknown>>(obj: T): { [K in keyof T]: Exclude<T[K], null> } => {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== null)) as { [K in keyof T]: Exclude<T[K], null> };
}
