import type { IServices } from "@/entities/services";
import { Avatar } from "@/entities/user";
import { markClasses } from "@/shared/constants";
import { PaletteIcon } from "@/shared/icons";
import { Button, Table, TableBody, TableCell, TableCellActions, TableHead, TableHeader, TableNotFound, TableRow, TableSeparator } from "@/shared/ui"
import { cn, minuteFormat } from "@/shared/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronRightIcon } from "lucide-react";
import React from "react";

interface ServicesTableProps {
  services?: IServices[];
}

export const ServicesTable = ({ services }: ServicesTableProps) => {
  const navigate = useNavigate();

console.log(services)
  return (
    <div className="mt-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Цена</TableHead>
            <TableHead>Длительность</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {services?.length ? 
            services.map((service, index) => (
              <React.Fragment key={index}>
                <TableRow onClick={() => navigate({ to: `/business/services/${service.id}` })}>
                  <TableCell>
                    <Avatar 
                      size={"large"} 
                      avatar_url={service.avatar} 
                      name={service.name} 
                      id={service.id}
                      className={"bg-black/15!"}
                      isIcon
                      icon={<PaletteIcon width={22} height={22} />}
                    >
                      <div className={cn("absolute bottom-0 right-0 w-2 h-2 rounded-full",  markClasses[service.mark ?? "red"])} />
                    </Avatar>
                    <div>
                      <p>{service.name}</p>
                      <p className="text-11 leading-3 opacity-50 mt-px font-normal">{service.category.length ? service.category : "Без категории"}</p>
                    </div>
                  </TableCell>
                  <TableCell>{service.price} ₽</TableCell>
                  <TableCell>{minuteFormat(service.duration)}</TableCell>
                  <TableCellActions>
                    <Link to={`${service.id}`}>
                      <Button variant={"white"} size={"icon_40"} animation={"toggle_sm"}>
                        <ChevronRightIcon width={17} height={17} />
                      </Button>
                    </Link>
                  </TableCellActions>

                </TableRow>
                {index !== services.length - 1 && <TableSeparator />}
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
