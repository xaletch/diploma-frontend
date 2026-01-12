import type { ILocationDetail } from "@/entities/location"
import { Avatar } from "@/entities/user"
import { LocationOnlineToggle } from "@/features/location"
import { Badge } from "@/shared/ui"
import { Card, CardContent, CardContentLabel, CardContentLabelDescription, CardContentLabelTitle, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card/ui/card"
import { replaceAddress } from "@/shared/utils"

interface LocationDetailProps {
  location: ILocationDetail;
}

export const LocationDetails = ({ location }: LocationDetailProps) => {
  return (
    <div className="grid grid-cols-5 gap-8 w-full">
      <div className="col-span-3">
        <Card>
          <CardHeader className="flex-row items-center gap-4 bg-card/60 rounded-t-3xl">
            <Avatar size={"xl"} id={location.id} name={location.name.slice(0, 1)} avatar_url={location.avatar} />
            <div className="space-y-0.5 flex-1">
              <CardTitle>{location?.name}</CardTitle>
              {location.address.full_address && <CardDescription className="opacity-50 text-xss">{replaceAddress(location.address.full_address)}</CardDescription>}
              <Badge variant={location.is_active ? "online" : "offline"}>{location.is_active ? "Онлайн" : "Офлайн"}</Badge>
            </div>
            <div>
              <LocationOnlineToggle isOnline={location.is_active} locationId={location.id} side={"top"} className={"bg-primary/15 hover:bg-primary/25"} />
            </div>
          </CardHeader>
          <CardContent className="space-y-5">

            <CardContentLabel>
              <CardContentLabelTitle>Номер телефона</CardContentLabelTitle>
              <CardContentLabelDescription>{location.phone}</CardContentLabelDescription>
            </CardContentLabel>

            <CardContentLabel>
              <CardContentLabelTitle>Адрес</CardContentLabelTitle>
              <CardContentLabelDescription>{replaceAddress(location.address.full_address)}</CardContentLabelDescription>
            </CardContentLabel>

            <CardContentLabel>
              <CardContentLabelTitle>Часовой пояс</CardContentLabelTitle>
              <CardContentLabelDescription>{location.timezone}</CardContentLabelDescription>
            </CardContentLabel>

            <CardContentLabel>
              <CardContentLabelTitle>Описание</CardContentLabelTitle>
              <CardContentLabelDescription>{location.description ?? "—"}</CardContentLabelDescription>
            </CardContentLabel>

          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Сотрудники</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 pt-0">
            <div className="flex -space-x-2.5">
              {location.users.slice(0, 6).map((user, idx) => <Avatar key={idx} id={user.id} avatar_url={user.avatar} name={user.name.slice(0, 1)} size={"small"} className={"rounded-full ring-2 ring-card-ring text-md"} />)}
              {location.users.length - 6 > 0 && <Avatar id={"12345678910313432"} name={`+${location.users.length - 6}`} size={"small"} className={"rounded-full ring-2 ring-card-ring text-xss"} />}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Услуги</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 pt-0">
            —
          </CardContent>
        </Card>

      </div>
      
    </div>
  )
}
