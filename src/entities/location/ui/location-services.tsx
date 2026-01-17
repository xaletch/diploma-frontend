import { Card } from "@/shared/ui"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card/ui/card"
import type { ILocationServices } from "../model/types/location.type";
import { Link } from "@tanstack/react-router";

interface LocationServicesProps {
  services: ILocationServices[];
}

export const LocationServices = ({ services }: LocationServicesProps) => {
  return (
    <Link to={services.length > 0 ? "#" : "/services/create"}>
      <Card>
        <CardHeader className="flex-row justify-between">
          <CardTitle className="mb-0">Услуги</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 pt-0">
          {services.length > 0 ?
            services.map((service, idx) => <div key={idx}>{service.name}</div>) : 
            <CardDescription>—</CardDescription>
          }
        </CardContent>
      </Card>
    </Link>
  )
}
