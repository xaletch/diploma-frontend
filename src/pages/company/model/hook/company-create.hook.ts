import type { AppDispatch } from "@/app/providers/redux/config";
import { useDispatch, useSelector } from "react-redux";
import type { CompanyType } from "../schema/company.schema";
import { addCompany, addCompanyIndustry, addCompanySpecialization, clearCompany, CompanyNextStep, CompanyPrevStep } from "../slice/company.slice";
import { useCompanyCreateMutation } from "../../service/company.service";
import { toast } from "sonner";
import { companySelector } from "../selector/company.selector";
import type { CompanyCredentials } from "../type/company-create.type";
import type { ISpecialization } from "../type/specialization.type";
import { useNavigate } from "@tanstack/react-router";
import { setAccount, useLazyMeQuery } from "@/entities/account";
import { useState } from "react";

interface CompanyCreateReturnProps {
  step: number;
  isLoading: boolean;
  specialization: ISpecialization | undefined;
  
  setCompany: (data: CompanyType) => void;
  selectSpecialization: (specialization: ISpecialization) => void;
  selectIndustry: (industryId: number) => void;
  create: () => Promise<void>;
  prevStep: () => void;
}

export const useCompanyCreate = (): CompanyCreateReturnProps => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const { company: companyData, step, specialization } = useSelector(companySelector);
  
  const [company] = useCompanyCreateMutation();
  const [account] = useLazyMeQuery();

  const setCompany = (data: CompanyType) => {
    const d = {
      ...data,
      timezone_offset: data.timezone,
    };
    dispatch(addCompany(d));
    dispatch(CompanyNextStep());
  };
  
  const selectSpecialization = (specialization: ISpecialization): void => {
    dispatch(addCompanySpecialization(specialization));
    dispatch(CompanyNextStep());
  };

  const prevStep = () => {
    dispatch(CompanyPrevStep());
  }

  const selectIndustry = (industryId: number): void => {
    dispatch(addCompanyIndustry(industryId));
  }

  const create = async (): Promise<void> => {
    setIsLoading(true);
    try {
      if (!companyData) return;
      const payload = { 
        // ...companyData, 

        // TEST
        public_name: companyData.public_name,
        name: companyData.name,
        post_code: companyData.post_code,
        country: companyData.country,
        currency: companyData.currency,
        city: "Москва",
        region: "Московская область",

        timezone: companyData.timezone,
        timezone_offset: companyData.timezone_offset,
        lat: 55.7558,
        lng: 37.6173,
        //

        specialization: companyData.specialization ?? 0, 
        industry: companyData.industry ?? 0 
      } satisfies CompanyCredentials;

      await company(payload).unwrap();
      const me = await account().unwrap();

      dispatch(setAccount(me));
      navigate({ to: "/", replace: true });
      dispatch(clearCompany());
    }
    catch (err) {
      console.error("Не удалось создать компанию", err);
      toast.error("Не удалось создать компанию", { description: JSON.stringify(err) });
    }
    finally {
      setIsLoading(false);
    }
  };

  return {
    step,
    isLoading,
    specialization,

    setCompany,
    selectSpecialization,
    selectIndustry,
    create,
    prevStep,
  };
}

