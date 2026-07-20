import type { MeLocation } from "@/entities/account";
import { Avatar } from "@/entities/user"
import { Card, CardContent } from "@/shared/ui"

interface IBookingSelectedLocation {
  location: MeLocation;
}

export const BookingSelectedLocation = ({ location }: IBookingSelectedLocation) => {
  return (
    <Card>
      <CardContent>
        {!location ? (
          <div>Загрузка...</div>
        ) : (
          <div className="flex items-center gap-2.5">
            <Avatar size={"md"} id={location?.id} name={location?.name} avatar_url={location?.avatar} />

            <div>
              <h3 className="text-base font-medium leading-5">{location?.name}</h3>
              <p className="text-xs leading-4">{location?.full_address}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
