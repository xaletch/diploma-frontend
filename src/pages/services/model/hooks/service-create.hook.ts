import { useCreateServiceMutation } from "@/entities/services";
import type { ServiceType } from "../schema/service.schema";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

interface UseCreateServiceReturnProps {
  isLoading: boolean;
  onSubmit: (data: ServiceType) => Promise<void>;
}

export const useCreateService = (): UseCreateServiceReturnProps => {
  const navigate = useNavigate();
  const [create, { isLoading }] = useCreateServiceMutation();

  const onSubmit = async (data: ServiceType) => {
    try {
      const res = await create(data);

      if (res.error) {
        console.log("res.error", res.error);
        throw new Error("test");
      }

      navigate({ to: "/business/services" });
    }
    catch (err) {
      console.log(err instanceof Error && err.message);
      toast.error(err instanceof Error && err.message);
    }
  }

  return { isLoading, onSubmit };
};
