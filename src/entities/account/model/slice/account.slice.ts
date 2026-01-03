import { deleteCookie, getCookie } from "@/shared/utils";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IMe } from "../types/me.type";

interface AccountState {
  isAuthenticated: boolean;
  account: IMe | null;
  isCompany: boolean;
}

const initialState: AccountState = {
  isAuthenticated: !!getCookie("access_token"),
  isCompany: false,
  account: null,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setAccount: (state, action: PayloadAction<IMe>) => {
      state.account = action.payload;
      state.isCompany = !!action.payload.company;
    },
    setIsCompany: (state, action) => {
      state.isCompany = action.payload;
    },
    logout: (state) => {
      deleteCookie("access_token");
      deleteCookie("refresh_token");
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthenticated, setAccount, setIsCompany, logout } = accountSlice.actions;
export default accountSlice.reducer;
