import type { IDirectoryEmployee } from "@/entities/directories";
import { useAddUserToServiceMutation, useRemoveUserForServiceMutation } from "@/entities/services";
import { Avatar } from "@/entities/user";
import { ROLE } from "@/shared/constants";
import { Button, Table, TableBody, TableCell, TableCellActions, TableRow, TableSeparator } from "@/shared/ui";
import { Checkbox } from "@/shared/ui/checkbox";
import { LazyBlur } from "@/widgets/loading";
import { Link } from "@tanstack/react-router";
import { ChevronRightIcon } from "lucide-react";
import React from "react";

interface ServiceEmployeeSettingProps {
  service_id: string;
  isLoading: boolean;
  data: IDirectoryEmployee[];
  employee: IDataList[];
}

export const ServiceEmployeeSetting = ({ service_id, data, isLoading, employee }: ServiceEmployeeSettingProps) => {

  const [addUser, { isLoading: isAdded }] = useAddUserToServiceMutation();
  const [removeUser, { isLoading: isRemoved }] = useRemoveUserForServiceMutation();

  return (
    <div className="mt-8">
      <div  className="max-w-140 mx-auto space-y-8">
        <Table>
          <TableBody className="relative">
            {isLoading && <LazyBlur />}
            {data.map((user, idx) => (
              <React.Fragment key={idx}>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Checkbox
                        checked={employee.some(e => e.id === user.id)}
                        disabled={isAdded || isRemoved}
                        onCheckedChange={(c) => c ? addUser({ service_id, user_id: user.id, user }) : removeUser({ service_id, user_id: user.id, user })}
                      />
                      <Avatar key={idx} id={user.id} avatar_url={user.avatar} name={user.first_name.slice(0, 1)} size={"large"} className="rounded-full" />
                      <div className="flex flex-col">
                        <div className="text-sm leading-4">{user.first_name} {user.last_name}</div>
                        <span className="text-11 mt-0.5 leading-3 opacity-50 font-normal">{ROLE[user.role.name]}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCellActions>
                    <Link to={`/employees/users/${user.id}`}>
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
