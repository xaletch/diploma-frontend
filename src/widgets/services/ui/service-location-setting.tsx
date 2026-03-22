import type { IDirectoryLocation } from "@/entities/directories";
import { useAddLocationToServiceMutation, useRemoveLocationForServiceMutation } from "@/entities/services";
import { Avatar } from "@/entities/user";
import { Button, Table, TableBody, TableCell, TableCellActions, TableRow, TableSeparator } from "@/shared/ui";
import { Checkbox } from "@/shared/ui/checkbox";
import { LazyBlur } from "@/widgets/loading";
import { Link } from "@tanstack/react-router";
import { ChevronRightIcon } from "lucide-react";
import React from "react";

interface ServiceLocationSettingProps {
  service_id: string;
  isLoading: boolean;
  data: IDirectoryLocation[];
  locations: IDataList[];
} 

export const ServiceLocationSetting = ({ service_id, data, isLoading, locations }: ServiceLocationSettingProps) => {
  const [addLocation, { isLoading: isAdded }] = useAddLocationToServiceMutation();
  const [removeLocation, { isLoading: isRemoved }] = useRemoveLocationForServiceMutation();

  return (
    <div className="mt-8">
      <div  className="max-w-140 mx-auto space-y-8">
        <Table>
          <TableBody className="relative">
            {isLoading && <LazyBlur />}
            {data.map((location, idx) => (
              <React.Fragment key={idx}>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Checkbox
                        checked={locations.some(e => e.id === location.id)}
                        disabled={isAdded || isRemoved}
                        onCheckedChange={(c) => c ? addLocation({ service_id, location_id: location.id, location }) : removeLocation({ service_id, location_id: location.id, location })}
                      />
                      <Avatar key={idx} id={location.id} avatar_url={location.avatar} name={location.name.slice(0, 1)} size={"large"} className="rounded-full" />
                      <div className="flex flex-col">
                        <div className="text-sm leading-4">{location.name}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCellActions>
                    <Link to={`/employees/locations/${location.id}`}>
                      <Button variant={"white"} size={"icon_40"} animation={"toggle_sm"}>
                        <ChevronRightIcon width={17} height={17} />
                      </Button>
                    </Link>
                  </TableCellActions>
                </TableRow>
                {idx !== data.length - 1 && <TableSeparator />}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
