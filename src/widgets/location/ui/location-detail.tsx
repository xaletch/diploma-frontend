import { LocationServices, LocationUsers, type ILocationDetail } from "@/entities/location"
import { Avatar } from "@/entities/user"
import { Can } from "@/features/auth"
import { Copyable } from "@/features/copyable"
import { LocationOnlineToggle } from "@/features/location"
import { Badge } from "@/shared/ui"
import { Card, CardContent, CardContentLabel, CardContentLabelDescription, CardContentLabelTitle, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card/ui/card"
import { replaceAddress } from "@/shared/utils"

interface LocationDetailProps {
  location: ILocationDetail;
}

export const LocationDetails = ({ location }: LocationDetailProps) => {
  return (
    <div className="mt-8">
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
              <Can permission="location:delete">
                <div>
                  <LocationOnlineToggle isOnline={location.is_active} locationId={location.id} side={"top"} className={"bg-primary/15 hover:bg-primary/25"} />
                </div>
              </Can>
            </CardHeader>
            <CardContent className="space-y-5">

              <CardContentLabel>
                <CardContentLabelTitle>Номер телефона</CardContentLabelTitle>
                <CardContentLabelDescription>
                  <Copyable text={location.phone}/>
                </CardContentLabelDescription>
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
          <LocationUsers users={location.users} />
          <Can permission="location:services">
            <LocationServices services={location.services} />
          </Can>
        </div>
        
      </div>
    </div>
  )
}
