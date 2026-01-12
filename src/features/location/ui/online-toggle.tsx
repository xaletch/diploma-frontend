import { WorldPauseIcon } from "@/shared/icons"
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui"
import { useLocationOnline } from "../model/hooks/online.hook";

interface LocationOnlineToggleProps {
  isOnline: boolean;
  locationId: string;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export const LocationOnlineToggle = ({ isOnline, locationId, side="bottom", className="" }: LocationOnlineToggleProps) => {
  const { handleToggle, isLoading } = useLocationOnline();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          variant={"white"} 
          size={"icon_40"} 
          animation={"toggle_sm"} 
          className={className} 
          disabled={isLoading}
          onClick={(e) => handleToggle(e, locationId, isOnline)}
        >
          <WorldPauseIcon width={16} height={16} />
        </Button>
      </TooltipTrigger>
      <TooltipContent side={side}>Приостановить</TooltipContent>
    </Tooltip>
  )
}
