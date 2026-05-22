import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type NavigationState = {
  to: string | null;
  from: string | null;
};

const initialState: NavigationState = {
  to: null,
  from: null,

};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    redirect: (state, action: PayloadAction<NavigationState>) => {
      state.to = action.payload.to;
      state.from = action.payload.from;
    },
    resetRedirect: (state) => { state.to = null },
  },
});

export const { redirect, resetRedirect } = navigationSlice.actions;
export default navigationSlice.reducer;
