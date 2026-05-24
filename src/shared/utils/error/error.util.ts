export const getErrorMessage = (error: unknown): string => {
  if (
    error &&
    typeof error === "object" &&
    "data" in error &&
    error.data &&
    typeof error.data === "object" &&
    "detail" in error.data
  ) {
    return String(error.data.detail);
  }

  return "Произошла неизвестная ошибка";
};
