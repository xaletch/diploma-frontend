import { cn } from "@/shared/utils";
import { getAvatarColor } from "../model/utils/get-color.util";
import { cva, type VariantProps } from "class-variance-authority";

const avatarVariants = cva(
  "flex items-center gap-0.5 text-lg justify-center bg-primary-foreground/35 relative",
  {
    variants: {
      size: {
        default: "min-w-10 w-10 h-10 rounded-10",
        small: "min-w-8 w-8 h-8 rounded-8",
        large: "min-w-11 w-11 h-11 rounded-12",
        xl: "min-w-24 w-24 h-24 rounded-3xl text-3xl"
      }
    },
    defaultVariants: {
      size: "default",
    }
  }
);

type AvatarUnion = {
  isIcon?: true;
  icon: React.ReactNode;
} | {
  isIcon?: false;
  icon?: undefined;
}

type AvatarProps = 
VariantProps<typeof avatarVariants> & React.ComponentProps<"div"> & 
AvatarUnion & {
  id: string;
  avatar_url?: string | null;
  name: string;
  opacity?: number;
  children?: React.ReactNode;
}

export const Avatar = ({ id, avatar_url, size, name, className, opacity, children, isIcon=false, icon, ...props }: AvatarProps) => {
  return (
    <div
      data-ui="avatar"
      className={cn(avatarVariants({ size }), className)}
      style={{ background: getAvatarColor(id, (opacity ?? 100) / 100) }}
      {...props}
    >
      {avatar_url ? (
        <img className="object-cover w-full h-full" src={avatar_url} alt={name} />
      ) : (
        isIcon ? <>{icon}</> :
        <span className="uppercase font-medium leading-5 select-none">{name}</span>
      )}
      {}
      {children}
    </div>
  )
}
