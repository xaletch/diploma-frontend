import { useEmployeeBlockedMutation } from "@/entities/employee";
import { Button } from "@/shared/ui"

interface BannedProps {
  isBanned: boolean;
  employee_id: string;
  location_id: string;
}

export const Banned = ({ isBanned, employee_id, location_id }: BannedProps) => {
  const [blocked, { isLoading }] = useEmployeeBlockedMutation();

  const handleBlocked = () => {
    blocked({
      employee_id,
      location_id,
      body: {
        is_banned: !isBanned,
      },
    });
  }

  return (
    <Button
      variant={"orange"}
      className={"text-sm font-bold"}
      size={"size_44"}
      disabled={isLoading}
      onClick={handleBlocked}
    >{isBanned ? "Разблокировать" : "Заблокировать"}</Button>
  )
}
