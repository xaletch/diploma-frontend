export {};

declare global {
  type HttpError<T = unknown> = {
    data: T & {
      title: string;
      detail: string;
      status: number;
    }
    status: number
  }
}
