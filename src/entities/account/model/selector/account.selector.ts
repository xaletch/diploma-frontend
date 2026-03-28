import type { RootState } from "@/app/providers/redux/config";

export const useAccount = (state: RootState) => state.account;

/**
  ===== НОВЫЙ ВАРИАНТ НЭЙМИНГА СЕЛЕКТОРА =====
**/
export const accountSelector = (state: RootState) => state.account;
