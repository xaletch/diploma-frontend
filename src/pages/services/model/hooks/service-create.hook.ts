import { useCreateServiceMutation } from "@/entities/services";
import type { ServiceType } from "../schema/service.schema";

interface UseCreateServiceReturnProps {
  isLoading: boolean;
  onSubmit: (data: ServiceType) => Promise<void>;
}

export const useCreateService = (): UseCreateServiceReturnProps => {
  const [create, { error, isLoading }] = useCreateServiceMutation();

  const onSubmit = async (data: ServiceType) => {
    try {
      const res = await create(data);
      console.log(res);
      if (res.error) {
        console.log("res.error", res.error);
        throw new Error("test");
      }
    }
    catch (err) {
      console.log(err instanceof Error && err.message);
    }
  }

  return { isLoading, onSubmit };
};
