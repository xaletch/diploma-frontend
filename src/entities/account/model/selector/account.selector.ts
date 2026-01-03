import type { RootState } from "@/app/providers/redux/config";

export const useAccount = (state: RootState) => state.account;
