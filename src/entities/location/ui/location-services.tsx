import type { ILocationServices } from "../model/types/location.type";
import { AvatarGroup } from "@/shared/ui/avatar";

interface LocationServicesProps {
  services: ILocationServices[];
}

export const LocationServices = ({ services }: LocationServicesProps) => {
  return (
    <AvatarGroup title={"Услуги"} to={services.length > 0 ? `/business/services` : `/business/services/create`} data={services} />
  )
}
