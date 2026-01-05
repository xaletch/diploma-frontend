import type { IRole } from "@/entities/account";
import SvgPersonCircle from "@/shared/icons/PersonCircle"

interface UserRoleProps {
  role: IRole;
}

export const UserRole = ({ role }: UserRoleProps) => {
  return (
    <div className="flex items-center gap-1 mt-1">
      <span>
        <SvgPersonCircle width={12} height={12}/>
      </span>
      <span className="text-10 font-medium leading-2.5">
        {
          role === "owner" ? "Владелец" :
          role === "employee" ? "Сотрудник" :
          role === "admin" ? "Администратор" : "Гость"
        }
      </span>
    </div>
  )
}
