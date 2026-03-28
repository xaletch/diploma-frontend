import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DialogUnion } from "../types/dialog.type";

interface DialogState {
  dialog: DialogUnion;
  open: boolean;
}

const initialState: DialogState = {
  dialog: {
    name: undefined,
    data: undefined,
  },
  open: false,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState: initialState,
  reducers: {
    dialogOpen: (state, action: PayloadAction<DialogUnion>) => {
      state.dialog = action.payload;
      state.open = true;
    },
    dialogClose: (state) => {
      state.open = false;
      state.dialog.name = undefined;
      state.dialog.data = undefined;
    },
  },
});

export const { dialogOpen, dialogClose } = dialogSlice.actions;
export default dialogSlice.reducer;