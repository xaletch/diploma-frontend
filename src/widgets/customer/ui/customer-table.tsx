import type { ICustomers } from "@/entities/customers";
import { Avatar } from "@/entities/user"
import { ChevronRightIcon } from "@/shared/icons"
import { Button, Table, TableBody, TableCell, TableCellActions, TableHead, TableHeader, TableNotFound, TableRow, TableSeparator } from "@/shared/ui"
import { LazyBlur } from "@/widgets/loading";
import { Link, useNavigate } from "@tanstack/react-router";
import React from "react";

interface CustomerTableProps {
  customers?: ICustomers[];
  isFetching: boolean;
}

export const CustomerTable = ({ customers, isFetching }: CustomerTableProps) => {
  const navigate = useNavigate();

  return (
    <div className="mt-8">
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Имя</TableHead>
            <TableHead>Номер телефона</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody className="relative">
          {isFetching && <LazyBlur />}
          {customers?.length ? 
            customers.map((employee, index) => (
              <React.Fragment key={index}>
                <TableRow onClick={() => navigate({ to: `${employee.id}` })}>
                  <TableCell>
                    <Avatar size={"large"} avatar_url={employee.avatar} name={employee.full_name.slice(0, 1)} id={employee.id} />
                    <div>
                      <p>{employee.full_name}</p>
                    </div>
                  </TableCell>
                  <TableCell>{employee.phone}</TableCell>
                  <TableCellActions>
                    <Link to={`${employee.id}`}>
                      <Button variant={"white"} size={"icon_40"} animation={"toggle_sm"}>
                        <ChevronRightIcon width={17} height={17} />
                      </Button>
                    </Link>
                  </TableCellActions>
                </TableRow>
                {index !== customers.length - 1 && <TableSeparator />}
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
