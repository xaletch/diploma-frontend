interface AvatarProps {
  avatar_url?: string | null;
  name: string;
}

export const Avatar = ({ avatar_url, name }: AvatarProps) => {
  return (
    <div className="min-w-10 w-10 h-10 flex items-center gap-0.5 justify-center bg-primary-foreground/35 rounded-10 overflow-hidden">
      {avatar_url ? (
        <img className="object-cover w-full h-full" src={avatar_url} alt={name} />
      ) : (
        <span className="uppercase font-medium text-lg leading-5">{name}</span>
      )}
    </div>
  )
}
