import type { AppDispatch } from "@/app/providers/redux/config";
import { setAccount, setLocation, useLazyMeQuery } from "@/entities/account";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

type StateType = {
  isInitialized: boolean;
  isLoading: boolean;
  error: Error | null;
  progress: number;
}

type InitializeReturnProps = StateType;

export const useInitialize = (): InitializeReturnProps => {
  const dispatch = useDispatch<AppDispatch>();
  const [state, setState] = useState<StateType>({
    isInitialized: false,
    isLoading: true,
    error: null as Error | null,
    progress: 0,
  });

  const navigate = useNavigate();

  const [account] = useLazyMeQuery();

  const shouldInitialize = useMemo(() => {
    return !state.isInitialized && state.isLoading;
  }, [state.isInitialized, state.isLoading]);

  const initialize = useCallback(async (): Promise<void> => {
    try {
      setState(p => ({ ...p, isLoading: true, progress: 0 }));

      const me = await account().unwrap();
      dispatch(setAccount(me));
      
      if (!localStorage.getItem("location")) {
        localStorage.setItem("location", JSON.stringify(me.locations[0]));
        dispatch(setLocation(me.locations[0]));
      }

      setState(p => ({ ...p, progress: 50 }));
  
      if (me.company === null) {
        navigate({ to: "/company/create" });
        setState(p => ({ ...p, isInitialized: true, isLoading: false, progress: 100 }))
        return;
      }

      setState(p => ({ ...p, isInitialized: true, isLoading: false, progress: 100 }))
    }
    catch (err) {
      setState(p => ({ ...p, error: err as Error, isLoading: false }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (shouldInitialize) {
      initialize();
    }
  }, [shouldInitialize, initialize]);

  return { ...state }
};
