import { Card } from "@/shared/ui"
import { CardContent, CardHeader, CardTitle } from "@/shared/ui/card/ui/card"
import type { ILocationUsersList } from "../model/types/location.type"
import { Avatar } from "@/entities/user";

interface LocationUsersProps {
  users: ILocationUsersList[];
}

export const LocationUsers = ({ users }: LocationUsersProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Сотрудники</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 pt-0">
        <div className="flex -space-x-2.5">
          {users.slice(0, 6).map((user, idx) => <Avatar key={idx} id={user.id} avatar_url={user.avatar} name={user.name} size={"small"} className={"rounded-full ring-2 ring-card-ring text-md"} />)}
          {users.length - 6 > 0 && <Avatar id={"12345678910313432"} name={`+${users.length - 6}`} size={"small"} className={"rounded-full ring-2 ring-card-ring text-xss"} />}
        </div>
      </CardContent>
    </Card>
  )
}
