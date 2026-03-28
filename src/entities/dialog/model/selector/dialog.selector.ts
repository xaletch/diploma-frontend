import type { RootState } from "@/app/providers/redux/config";

export const dialogSelector = (state: RootState) => state.dialog;
