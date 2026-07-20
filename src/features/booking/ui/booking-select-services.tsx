import { useLocationServicesQuery, type IDirectoryLocationService } from "@/entities/directories";
import { Avatar } from "@/entities/user";
import { markClasses } from "@/shared/constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select/ui/select-custom";
import { cn, formatPrice, minuteFormat } from "@/shared/utils";
import { Link } from "@tanstack/react-router";
import type { ServiceSettingType } from "../model/types/booking-setting-service.type";

interface BookingSelectServicesProps {
  location_id: string;
  service: IDirectoryLocationService | undefined;
  services: Array<{ id: string }> | undefined;
  setSetting: React.Dispatch<React.SetStateAction<ServiceSettingType>>;
}

export const BookingSelectServices = ({ location_id, service, services, setSetting }: BookingSelectServicesProps) => {
  const { data, isLoading } = useLocationServicesQuery(
    { location_id },
    { refetchOnMountOrArgChange: true },
  );

  return (
    <div>
      <Select value={{
        value: service?.name ?? "",
        label: service?.name ?? "",
        avatar: service?.id ? { id: service?.id, name: service?.name, avatar_url: service?.avatar } : undefined, 
      }}>
        <SelectTrigger className="h-16">
          <SelectValue placeholder="Услуга" />
        </SelectTrigger>
        <SelectContent className="p-0">
          {isLoading ? (
            <div className="p-4 text-center text-sm opacity-60">Загрузка...</div>
          ) : (
            data && data.map((service, idx) => (
              <SelectItem
                key={idx}
                value={{
                  value: service.name,
                  label: service.name,
                  avatar: { id: service.id, name: service.name, avatar_url: service.avatar }
                }}
                onChange={() => setSetting(p => ({ ...p, service }))}
                className="flex items-center gap-2 rounded-none"
              >
                <div className="relative">
                  <Avatar size={"small"} id={service.id} avatar_url={service.avatar} name={service.name} />
                  <div className={cn("absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full",  markClasses[service.mark ?? "red"])} />
                </div>
                <div>
                  <div className="text-xs leading-5 font-medium">{service.name}</div>
                  <div className="flex items-center gap-1">
                    <span className="text-11 leading-3">{minuteFormat(service.duration)} • {formatPrice(service.prices.price)} ₽</span>
                  </div>
                  {services && !services.some(s => s.id === service.id) && <div className="text-11 text-red leading-3">Отключено для сотрудника</div>}
                </div>
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
      <div className="text-xs mt-1.5">
        <span className="opacity-80">Чтобы создавать и редактировать услуги, перейдите в раздел</span> {" "}
        <Link className="text-primary font-medium" to={"/business/services"}>"Услуги"</Link>
      </div>
    </div>
  )
}
