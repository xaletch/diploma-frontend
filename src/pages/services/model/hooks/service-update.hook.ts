import { useEditServiceMutation } from "@/entities/services";
import type { ServiceType } from "../schema/service.schema";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/utils";

interface UseEditServiceReturnProps {
  isLoading: boolean;
  onSubmit: (data: ServiceType) => Promise<void>;
}

export const useEditService = (service_id: string): UseEditServiceReturnProps => {
  const navigate = useNavigate();
  const [edit, { isLoading }] = useEditServiceMutation();

  const onSubmit = async (data: ServiceType) => {
    try {
      const res = await edit({ service_id, body: data });

      if (res.error) {
        console.log("res.error", res.error);
        throw new Error("test");
      }

      navigate({ to: `/business/services/${service_id}` });
    }
    catch (err) {
      console.log(err instanceof Error && err.message);
      toast.error(getErrorMessage(err));
    }
  }

  return { isLoading, onSubmit };
};
