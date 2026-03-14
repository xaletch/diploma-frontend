import type { IEmployee } from "@/entities/employee";
import { Avatar } from "@/entities/user"
import { ChevronRightIcon } from "@/shared/icons"
import { Badge, Button, Table, TableBody, TableCell, TableCellActions, TableHead, TableHeader, TableNotFound, TableRow, TableSeparator } from "@/shared/ui"
import { Link, useNavigate } from "@tanstack/react-router";
import React from "react";

interface EmployeeTableProps {
  employees?: IEmployee[];
  isLoading: boolean;
}

export const EmployeeTable = ({ employees }: EmployeeTableProps) => {
  const navigate = useNavigate();
  return (
    <div className="mt-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Имя</TableHead>
            <TableHead>Номер телефона</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {employees?.length ? 
            employees.map((employee, index) => (
              <React.Fragment key={index}>
                <TableRow onClick={() => navigate({ to: `${employee.id}` })}>
                  <TableCell>
                    <Avatar size={"large"} avatar_url={employee.avatar} name={employee.name.slice(0, 1)} id={employee.id} />
                    <div>
                      <p>{employee.name}</p>
                      {employee.position && <p className="text-11 leading-3 opacity-50 mt-px font-normal">{employee.position}</p>}
                    </div>
                  </TableCell>
                  <TableCell>{employee.phone}</TableCell>
                  <TableCell>
                    <Badge variant={employee.status}>{employee.status === "active" ? "Активный" : "Не активный"}</Badge>
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
                <TableNotFound>Нет данных</TableNotFound>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </div>
  )
}
