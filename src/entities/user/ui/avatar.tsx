import { cn } from "@/shared/utils";
import { getAvatarColor } from "../model/utils/get-color.util";

interface AvatarProps {
  id: string;
  avatar_url?: string | null;
  name: string;
}

export const Avatar = ({ id, avatar_url, name }: AvatarProps) => {
  return (
    <div 
      className={cn(
        "min-w-10 w-10 h-10 rounded-10 overflow-hidden",
        "flex items-center gap-0.5 justify-center",
        "bg-primary-foreground/35",
        `${getAvatarColor(id)}`,
      )}
    >
      {avatar_url ? (
        <img className="object-cover w-full h-full" src={avatar_url} alt={name} />
      ) : (
        <span className="uppercase font-medium text-lg leading-5 select-none">{name}</span>
      )}
    </div>
  )
}
