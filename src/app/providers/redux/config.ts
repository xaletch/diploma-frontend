import { accountSlice } from "@/entities/account";
import { companySlice } from "@/pages/company";
import { API } from "@/shared/api";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [API.reducerPath]: API.reducer,

    // ...
    company: companySlice,
    account: accountSlice,
  },

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat([API.middleware]);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;