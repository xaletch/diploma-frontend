import { useState } from "react";
import type { SettingType } from "../schemas/setting.schema"
import { useCompanyLogoMutation } from "@/pages/company/service/company.service";
import { useSettingCompanyMutation, useSettingPageMutation } from "@/entities/settings";
import { useAppDispatch } from "@/shared/hooks";
import { updateSettings } from "@/entities/account";
import { getErrorMessage } from "@/shared/utils";
import { toast } from "sonner";

interface UseSettingsReturnProps {
  onSubmit: (data: SettingType, role?: RoleType) => Promise<void>;
  isLoading: boolean;
}

export const useSettings = (): UseSettingsReturnProps => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  
  const [pageUpdate] = useSettingPageMutation();
  const [companyUpdate] = useSettingCompanyMutation();
  const [companyLogo] = useCompanyLogoMutation();


  const onSubmit = async (data: SettingType, role?: RoleType) => {
    setIsLoading(true);
    try {
      const { pages, ...general } = data;
      const req: Promise<unknown>[] = [pageUpdate({ pages }).unwrap()];
  
      if (role === "owner") {
        const { logo, ...company } = general;
        req.push(companyUpdate({ ...company }).unwrap());
        if (logo) {
          const formData = new FormData();
          formData.append("file", logo);
          req.push(companyLogo(formData).unwrap());
        }
      }
  
      await Promise.all(req);
      dispatch(updateSettings({ pages }));
    }
    catch (err) {
      toast.error(getErrorMessage(err));
    }
    finally {
      setIsLoading(false);
    }
  }

  return { onSubmit, isLoading }
}
