/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
export const removeEmpty = <T extends Record<string, any>>
  (obj: T): Partial<T> => {
    return Object.fromEntries(Object.entries(obj)
      .filter(([_, v]) => v !== undefined && v !== "")
    ) as Partial<T>;
  }
