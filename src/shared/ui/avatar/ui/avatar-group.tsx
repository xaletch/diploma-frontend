import { Avatar } from "@/entities/user"
import { Card, CardContent, CardHeader, CardTitle } from "../../card/ui/card"
import type { AvatarGroupType } from "../model/types/avatar-group.type";
import { Link } from "@tanstack/react-router";

interface AvatarGroupProps {
  data: AvatarGroupType[];
  title: string;
  to: string;
}

export const AvatarGroup = ({ data, title, to }: AvatarGroupProps) => {
  return (
    <Link to={to}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 pt-0">
          <div className="flex -space-x-2.5">
            {data.slice(0, 6).map((item, idx) => <Avatar key={idx} id={item.id} avatar_url={item.avatar} name={item.name.slice(0, 1)} size={"small"} className={"rounded-full ring-2 ring-card-ring text-xs"} />)}
            {data.length === 0 && <span>-</span>}
            {data.length - 6 > 0 && <Avatar id={"12345678910313432"} name={`+${data.length - 6}`} size={"small"} className={"rounded-full ring-2 ring-card-ring text-xss"} />}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
