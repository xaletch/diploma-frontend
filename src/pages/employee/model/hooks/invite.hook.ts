import { useState } from "react";
import { useEmployeeInviteMutation, useLazyCheckEmployeeInLocationQuery, useLazyGetEmployeeByEmailQuery, type IEmployeeByEmail, type IEmployeeInviteCredentials } from "@/entities/employee";
import { isApiError } from "@/shared/utils";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import type { EmployeeSchemaType, InviteCheckSchemaType } from "../schemas";

type InviteStep = "check" | "invite" | "create";

type InviteLoading = {
  check?: boolean;
  invite?: boolean;
  create?: boolean;
}

type InviteError = {
  check?: string;
  invite?: string;
  create?: string;
}

interface UseInviteReturnProps {
  step: InviteStep;
  employee: IEmployeeByEmail | null;
  isLoading: InviteLoading;
  error: InviteError;
  onCheck: (data: InviteCheckSchemaType, location_id: string) => Promise<void>;
  onInvite: (data: EmployeeSchemaType, location_id: string) => Promise<void>;
}

export const useInvite = (): UseInviteReturnProps => {
  const [step, setStep] = useState<InviteStep>("check");
  const [employee, setEmployee] = useState<IEmployeeByEmail | null>(null);
  const [isLoading, setIsLoading] = useState<InviteLoading>({ check: false, invite: false, create: false });
  const [error, setError] = useState<InviteError>({ check: "", invite: "", create: "" });
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [checkEmployee] = useLazyGetEmployeeByEmailQuery();
  const [checkEmployeeInLocation] = useLazyCheckEmployeeInLocationQuery();
  const [invite] = useEmployeeInviteMutation();

  const onCheck = async (data: InviteCheckSchemaType, location_id: string): Promise<void> => {
    setIsLoading({ check: true });
    setEmail(data.email);
    setError({ check: "" });
    try {
      const res = await checkEmployee({ email: data.email }).unwrap() as IEmployeeByEmail;
      await checkEmployeeInLocation({ user_id: res.id, location_id }).unwrap();

      setStep("invite");
      setEmployee(res);
    }
    catch (error) {
      if (isApiError(error) && error.status === 404) {
        setStep("create");
      }
      if (isApiError(error) && error.status === 409) {
        setError({ check: error.data.detail });
      }
      if (isApiError(error) && error.status === 400) {
        setError({ check: error.data.detail });
      }
    }
    finally {
      setIsLoading({ check: false });
    }
  }

  const onInvite = async (data: EmployeeSchemaType, location_id: string): Promise<void> => {
    setIsLoading({ create: true });
    try {
      const req = {
        email,
        phone: data.phone,
        first_name: data.first_name,
        last_name: data.last_name,
        role: Number(data.role),
        position: data.position,
        location_id,
      } satisfies IEmployeeInviteCredentials;

      const res = await invite(req).unwrap();
      toast.success(res.message);
      navigate({ to: "/employees/users" });
    }
    catch (error) {
      console.log("error invite", error);
    }
    finally {
      setIsLoading({ create: false });
    }
  }

  return {
    step,
    employee,
    isLoading,
    error,
    onCheck,
    onInvite,
  }
};
