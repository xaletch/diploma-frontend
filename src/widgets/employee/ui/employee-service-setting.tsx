import type { IDirectoryService } from "@/entities/directories";
import { useAddServiceToUserMutation, useRemoveServiceFromUserMutation } from "@/entities/employee";
import { Avatar } from "@/entities/user";
import { Button, Table, TableBody, TableCell, TableCellActions, TableRow, TableSeparator } from "@/shared/ui";
import { Checkbox } from "@/shared/ui/checkbox";
import { LazyBlur } from "@/widgets/loading";
import { Link } from "@tanstack/react-router";
import { ChevronRightIcon } from "lucide-react";
import React from "react";

interface EmployeeServiceSettingProps {
  employee_id: string;
  location_id: string;
  isLoading: boolean;
  services: IDirectoryService[];
  active_service: IDataList[];
}

export const EmployeeServiceSetting = ({ employee_id, location_id, services, isLoading, active_service }: EmployeeServiceSettingProps) => {

  const [addService, { isLoading: isAdded }] = useAddServiceToUserMutation();
  const [removeService, { isLoading: isRemoved }] = useRemoveServiceFromUserMutation();

  return (
    <div className="mt-8">
      <div  className="max-w-140 mx-auto space-y-8">
        <Table>
          <TableBody className="relative">
            {isLoading && <LazyBlur />}
            {services.map((service, idx) => (
              <React.Fragment key={idx}>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Checkbox
                        checked={active_service.some(e => e.id === service.id)}
                        disabled={isAdded || isRemoved}
                        onCheckedChange={(c) => c ? addService({ employee_id, service_id: service.id, location_id, service }) : removeService({ employee_id, service_id: service.id, location_id })}
                      />
                      <Avatar key={idx} id={service.id} avatar_url={undefined} name={service.name} size={"large"} className="rounded-full" />
                      <div className="flex flex-col">
                        <div className="text-sm leading-4">{service.name}</div>
                        {/* <span className="text-11 mt-0.5 leading-3 opacity-50 font-normal">{ROLE[user.role.name]}</span> */}
                      </div>
                    </div>
                  </TableCell>
                  <TableCellActions>
                    <Link to={`/business/services/${service.id}`}>
                      <Button variant={"white"} size={"icon_40"} animation={"toggle_sm"}>
                        <ChevronRightIcon width={17} height={17} />
                      </Button>
                    </Link>
                  </TableCellActions>
                </TableRow>
                {idx !== services.length - 1 && <TableSeparator />}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
