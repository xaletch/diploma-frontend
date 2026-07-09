import { useLocationEmployeesQuery, type IDirectoryLocationEmployee } from "@/entities/directories";
import { Avatar } from "@/entities/user";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select/ui/select-custom";
import type { ServiceSettingType } from "../model/types/booking-setting-service.type";

interface BookingSelectEmployeeProps {
  location_id: string;
  employee: IDirectoryLocationEmployee | undefined;
  users: Array<{ id: string }> | undefined; // СОТРУДНИКИ КОТОРЫЕ РАБОТАЮТ С УКАЗАННОЙ УСЛУГОЙ
  setSetting: React.Dispatch<React.SetStateAction<ServiceSettingType>>;
}

export const BookingSelectEmployee = ({ location_id, employee, users, setSetting }: BookingSelectEmployeeProps) => {
  const { data, isLoading } = useLocationEmployeesQuery({ location_id });

  return (
    <div>
      <Select value={{
        value: employee?.full_name ?? "",
        label: employee?.full_name ?? "",
        avatar: employee ? { id: employee.id, name: employee.full_name, avatar_url: employee.avatar } : undefined
      }}>
        <SelectTrigger className="h-16">
          <SelectValue placeholder="Исполнитель" />
        </SelectTrigger>
        <SelectContent className="p-0">
          {isLoading ? (
            <div className="p-4 text-center text-sm opacity-60">Загрузка...</div>
          ) : (
            data && data.map((emp, idx) => (
              <SelectItem
                key={idx}
                value={{
                  value: emp.full_name,
                  label: emp.full_name,
                  avatar: { id: emp.id, name: emp.full_name, avatar_url: emp.avatar }
                }}
                onChange={() => setSetting(p => ({ ...p, employee: emp }))}
                className="flex items-center gap-2 rounded-none"
              >
                <Avatar size={"small"} id={emp.id} avatar_url={emp.avatar} name={emp.full_name} />
                <div>
                  <div className="text-xs leading-5 font-medium">{emp.full_name}</div>
                  <div className="flex items-center gap-1">
                    <span className="text-11 leading-3">{emp.position}</span>
                  </div>
                  {users && !users.some(u => u.id === emp.profile_id) && <div className="text-11 text-red leading-3">Не предлагает выбранную услугу</div>}
                </div>
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  )
}
