import { apiUrl } from "@/shared/constants";
import { getCookie } from "@/shared/utils";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseQuery = fetchBaseQuery({
  baseUrl: apiUrl,
  prepareHeaders: (head) => {
    const token: string | null = getCookie("access_token");

    if (token) head.set("Authorization", `Bearer ${token}`);

    return head;
  },
  // headers: {  },
});