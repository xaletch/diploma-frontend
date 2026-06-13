import type { AppDispatch } from "@/app/providers/redux/config";
import { useDispatch, useSelector } from "react-redux";
import type { CompanyType } from "../schema/company.schema";
import { addCompany, addCompanyIndustry, addCompanySpecialization, clearCompany, CompanyNextStep, CompanyPrevStep } from "../slice/company.slice";
import { useCompanyCreateMutation, useCompanyLogoMutation } from "../../service/company.service";
import { toast } from "sonner";
import { companySelector } from "../selector/company.selector";
import type { CompanyCredentials } from "../type/company-create.type";
import type { ISpecialization } from "../type/specialization.type";
import { useNavigate } from "@tanstack/react-router";
import { setAccount, setLocation, useLazyMeQuery } from "@/entities/account";
import { useState } from "react";
import { timezoneCredSchema } from "@/shared/schemas/timezone.schema";
import { getErrorMessage } from "@/shared/utils";

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
  const [uploadLogo] = useCompanyLogoMutation();
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

      const {
        name, post_code, country,
        currency, lat, lng, specialization,
        industry, logo, address, ...companyDto
      } = companyData;

      console.log(address);

      const { timezone, timezone_offset } = timezoneCredSchema.parse(companyData.timezone);
      const payload = { 
        ...companyDto,

        // TEST
        name,
        post_code,
        country,
        currency,
        city: "Москва",
        region: "Московская область",

        timezone,
        timezone_offset,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        //

        specialization: specialization ?? 0, 
        industry: industry ?? 0 
      } satisfies CompanyCredentials;

      await company(payload).unwrap();

      if (logo) {
        const formData = new FormData();
        formData.append("file", logo);
        await uploadLogo(formData).unwrap();
      }

      const me = await account().unwrap();

      dispatch(setAccount(me));
      dispatch(setLocation(me.locations[0]));
      navigate({ to: "/", replace: true });
      dispatch(clearCompany());
    }
    catch (err) {
      console.error("Не удалось создать компанию", err);
      toast.error(getErrorMessage(err));
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

