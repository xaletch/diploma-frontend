import { useCallback, useEffect, useRef, useState } from "react";
import { useLazyHealthQuery } from "../service/health.service"
import { useNavigate } from "@tanstack/react-router";
import { useAppDispatch } from "@/shared/hooks";
import { navigationSelector, resetRedirect } from "@/entities/navigation";
import { useSelector } from "react-redux";

interface UseHealthReturnProps {
  success: boolean;
}

export const useHealth = (): UseHealthReturnProps => {
  const [success, setSuccess] = useState(false);
  const [health] = useLazyHealthQuery();
  const dispatch = useAppDispatch();
  const { from } = useSelector(navigationSelector);
  const fromRef = useRef(from); 

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
      const time = setTimeout(() => navigation({ to: fromRef.current ?? "/" }), 2500);
      return () => clearTimeout(time);
    }
  }, [success, navigation]);

  return { success };
}
