import { useOnlineLocationMutation } from "@/entities/location";
import { toast } from "sonner";

interface UseLocationOnlineReturnProps {
  isLoading: boolean;
  handleToggle: (e: React.MouseEvent<HTMLButtonElement>, locationId: string, isOnline: boolean) => Promise<void>;
}

export const useLocationOnline = (): UseLocationOnlineReturnProps => {
  const [online, { isLoading }] = useOnlineLocationMutation();

  const handleToggle = async (e: React.MouseEvent<HTMLButtonElement>, locationId: string, isOnline: boolean): Promise<void> => {
    e.stopPropagation();

    try {
      await online({ locationId, active: !isOnline }).unwrap();
    }
    // {"status":404,"data":{"message":"Локация не найдена","error":"Not Found","statusCode":404}}
    catch (err) {
      console.error("Не удалось изменить статус", err);
      toast.error("Не удалось изменить статус", { description: JSON.stringify(err) })
    }
  }

  return { isLoading, handleToggle };
}