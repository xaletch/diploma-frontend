import type { IEmployee, IEmployeeQuery } from "@/entities/employee";
import { Avatar } from "@/entities/user"
import { EMPLOYEE_STATUS, ROLE } from "@/shared/constants";
import { ChevronRightIcon } from "@/shared/icons"
import { Badge, Button, Pagination, Table, TableBody, TableCell, TableCellActions, TableHead, TableHeader, TableNotFound, TableRow, TableSeparator } from "@/shared/ui"
import { LazyBlur } from "@/widgets/loading";
import { Link, useNavigate } from "@tanstack/react-router";
import React from "react";
import { EmployeeSort } from "./employee-sort";

interface EmployeeTableProps {
  employees?: IEmployee[];
  isFetching: boolean;
  profileId: string | undefined;
  meta: PaginationMeta;
  query: IEmployeeQuery;
}

export const EmployeeTable = ({ employees, isFetching, profileId, meta, query }: EmployeeTableProps) => {
  const navigate = useNavigate();

  return (
    <div className="mt-8 space-y-6">

      <EmployeeSort {...query} />
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Имя</TableHead>
            <TableHead>Номер телефона</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody className="relative">
          {isFetching && <LazyBlur />}
          {employees?.length ? 
            employees.map((employee, index) => (
              <React.Fragment key={index}>
                <TableRow onClick={() => navigate({ to: `${profileId === employee.id ? '/me' : employee.id}` })}>
                  <TableCell>
                    <Avatar size={"large"} avatar_url={employee.avatar} name={employee.full_name} id={employee.id} />
                    <div>
                      <p>{employee.full_name}</p>
                      <p className="text-11 leading-3 opacity-50 mt-px font-normal">{ROLE[employee.role.name]}{employee.position && `, ${employee.position}`}</p>
                    </div>
                  </TableCell>
                  <TableCell>{employee.phone}</TableCell>
                  <TableCell>
                    {employee.is_banned ? 
                      <Badge variant={"inactive"}>Заблокирован</Badge> :
                      <Badge variant={employee.status}>{EMPLOYEE_STATUS[employee.status]}</Badge>
                    }
                  </TableCell>
                  <TableCellActions>
                    <Link to={`${employee.id}`}>
                      <Button variant={"white"} size={"icon_40"} animation={"toggle_sm"}>
                        <ChevronRightIcon width={17} height={17} />
                      </Button>
                    </Link>
                  </TableCellActions>
                </TableRow>
                {index !== employees.length - 1 && <TableSeparator />}
              </React.Fragment>
            )) : (
              <TableRow>
                <TableNotFound>Ничего не найдено</TableNotFound>
              </TableRow>
            )
          }
        </TableBody>
      </Table>

      {meta.total_pages > 1 && <Pagination {...meta} />}
    </div>
  )
}
