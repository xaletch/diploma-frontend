import type { AppDispatch } from "@/app/providers/redux/config";
import { useDispatch } from "react-redux";
import type { CompanyType } from "../schema/company.schema";
import { addCompany } from "../slice/company.slice";
import { useNavigate } from "@tanstack/react-router";

interface CompanyCreateReturnProps {
  stepOne: (data: CompanyType) => void;
  stepTwo: () => void;
  create: () => void;
}

export const useCompanyCreate = (): CompanyCreateReturnProps => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const stepOne = (data: CompanyType) => {
    const d = {
      ...data,
      timezone_offset: data.timezone,
    };
    dispatch(addCompany(d));
    navigate({ to: "service" });
    console.log("message")
  };
  
  const stepTwo = (): void => {};

  const create = async (): Promise<void> => {};

  return { stepOne, stepTwo, create };
}
