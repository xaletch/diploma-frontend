import { useEmployeeBlockedMutation } from "@/entities/employee";
import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui"

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
    <button type="button" onClick={handleBlocked} disabled={isLoading} className="cursor-pointer">
      <Card>
        <CardHeader>
          <CardTitle className="text-orange text-start">{isBanned ? "Разблокировать" : "Заблокировать"}</CardTitle>
          <CardDescription className="text-start">Доступ в локацию будет {isBanned ? "открыт" : "закрыт"}.</CardDescription>
        </CardHeader>
      </Card>
    </button>
  )
}
