import { createApi } from "@reduxjs/toolkit/query/react";
import { reauthQuery } from "./setting/reauth";

export const API = createApi({
  baseQuery: reauthQuery,
  reducerPath: "API",
  tagTypes: ["LOCATIONS", "SERVICES"],
  endpoints: () => ({}),
});
