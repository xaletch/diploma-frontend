import { WorldPauseIcon } from "@/shared/icons"
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui"

interface LocationOnlineToggleProps {
  isOnline: boolean;
  locationId: string;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export const LocationOnlineToggle = ({ isOnline, locationId, side="bottom", className="" }: LocationOnlineToggleProps) => {

  // create hook
  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    console.log(!isOnline, locationId);
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={"white"} size={"icon_40"} animation={"toggle_sm"} className={className} onClick={handleToggle}>
          <WorldPauseIcon width={16} height={16} />
        </Button>
      </TooltipTrigger>
      <TooltipContent side={side}>Приостановить</TooltipContent>
    </Tooltip>
  )
}
