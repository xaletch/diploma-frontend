import { deleteCookie, getCookie } from "@/shared/utils";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IMe, MeLocations } from "../types/me.type";

interface AccountState {
  isAuthenticated: boolean;
  account: IMe | null;
  isCompany: boolean;
  location: MeLocations | null;
}

const storeLocation = localStorage.getItem("location");

const initialState: AccountState = {
  isAuthenticated: !!getCookie("access_token"),
  isCompany: false,
  account: null,
  location: storeLocation ? JSON.parse(storeLocation) : null,
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
    setLocation: (state, action: PayloadAction<MeLocations>) => {
      state.location = action.payload;
      localStorage.setItem("location", JSON.stringify(action.payload));
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

export const {
  setAuthenticated,
  setAccount,
  setLocation,
  setIsCompany,
  logout,
} = accountSlice.actions;
export default accountSlice.reducer;
