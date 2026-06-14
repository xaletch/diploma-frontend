import { useEditServiceMutation, usePhotoServiceMutation } from "@/entities/services";
import type { ServiceType } from "../schema/service.schema";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/utils";
import { useState } from "react";

interface UseEditServiceReturnProps {
  isLoading: boolean;
  onSubmit: (data: ServiceType) => Promise<void>;
}

export const useEditService = (service_id: string): UseEditServiceReturnProps => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [edit] = useEditServiceMutation();
  const [uploadPhoto] = usePhotoServiceMutation();

  const onSubmit = async (data: ServiceType) => {
    setIsLoading(true);
    try {
      const { avatar, ...body } = data;
      const res = await edit({ service_id, body });

      if (res.error) {
        console.log("res.error", res.error);
        throw new Error("test");
      }

      if (avatar) {
        const formData = new FormData();
        formData.append("file", avatar);
        await uploadPhoto({ service_id, body: formData}).unwrap();
      }

      navigate({ to: `/business/services/${service_id}` });
    }
    catch (err) {
      console.log(err instanceof Error && err.message);
      toast.error(getErrorMessage(err));
    }
    finally {
      setIsLoading(false);
    }
  }

  return { isLoading, onSubmit };
};
