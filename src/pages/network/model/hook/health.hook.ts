import { useCallback, useEffect, useState } from "react";
import { useLazyHealthQuery } from "../service/health.service"
import { useNavigate } from "@tanstack/react-router";
import { useAppDispatch } from "@/shared/hooks";
import { resetRedirect } from "@/entities/navigation";

interface UseHealthReturnProps {
  success: boolean;
}

export const useHealth = (): UseHealthReturnProps => {
  const [success, setSuccess] = useState(false);
  const [health] = useLazyHealthQuery();
  const dispatch = useAppDispatch();

  const navigation = useNavigate();

  const check = useCallback(async () => {
    try {
      await health().unwrap();

      dispatch(resetRedirect());
      setSuccess(true);
    }
    catch {
      // 🖕
    }
  }, [dispatch, health]);

  useEffect(() => {
    if (success) return;

    check();
    const interval = setInterval(() => check(), 5000);

    return () => clearInterval(interval);
  }, [success, check]);

  useEffect(() => {
    if (success) {
      const time = setTimeout(() => navigation({ to: "/" }), 2500);
      return () => clearTimeout(time);
    }
  }, [success, navigation]);

  return { success };
}
