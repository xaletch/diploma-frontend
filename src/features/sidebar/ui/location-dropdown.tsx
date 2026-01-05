import type { AppDispatch } from "@/app/providers/redux/config";
import { setLocation, type MeLocations } from "@/entities/account";
import { Avatar } from "@/entities/user";
import SvgAdd from "@/shared/icons/Add";
import SvgChevron from "@/shared/icons/Chevron";
import { Badge, Button, HoverDropdown, HoverDropdownContent, HoverDropdownItemTrigger, HoverDropdownLabel, HoverDropdownSeparator, HoverDropdownTrigger } from "@/shared/ui"
import { useDispatch } from "react-redux";

interface LocationDropdownProps {
  avatar_url?: string | null;
  name: string;
  locations: MeLocations[];
  selectId?: string;
}

export const LocationDropdown = ({ avatar_url, name, locations, selectId }: LocationDropdownProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSelectLocation = (loc: MeLocations) => {
    dispatch(setLocation(loc));
  }

  return (
    <HoverDropdown className={"px-5"}>
      <HoverDropdownTrigger>
        <Button variant={"dropdown"} size={"none"} classNameChild={"flex flex-1 items-center !whitespace-normal"}>
          <div className="flex items-center gap-3 flex-1">
            <Avatar id={selectId ?? ""} avatar_url={avatar_url} name={name.slice(0, 1)} />
            <div className="flex flex-col">
              <p className="text-start text-sm font-semibold leading-4">{name}</p>
            </div>
          </div>
          <div className="rotate-90">
            <SvgChevron width={16} height={16}/>
          </div>
        </Button>
      </HoverDropdownTrigger>
      <HoverDropdownContent align={"end"} side={"top_right"} className={"px-0 w-70"}>
        <HoverDropdownLabel>Ваши локации</HoverDropdownLabel>
        {locations.map((loc, idx) => (
          <HoverDropdownItemTrigger
            key={idx} 
            className={`rounded-none ${selectId === loc.id ? "bg-primary/90 text-white/90" : ""}`}
            onClick={() => handleSelectLocation(loc)}
          >
            <Avatar id={loc.id} avatar_url={loc.avatar} name={loc.name.slice(0, 1)} />
            <p className="text-start text-md font-semibold leading-3">{loc.name}</p>
          </HoverDropdownItemTrigger>
        ))}
        <HoverDropdownSeparator className={"mt-3 mb-1.5"} />
        <HoverDropdownItemTrigger className={"rounded-none"}>
          <Badge variant={"action"}>
            <SvgAdd width={24} height={24} />
          </Badge>
          <p className="text-start text-md font-semibold leading-3">Создать локацию</p>
        </HoverDropdownItemTrigger>
      </HoverDropdownContent>
    </HoverDropdown>
  )
}
