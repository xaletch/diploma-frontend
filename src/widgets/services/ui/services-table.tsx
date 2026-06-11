import type { IServiceQuery, IServices } from "@/entities/services";
import { Avatar } from "@/entities/user";
import { markClasses } from "@/shared/constants";
import { PaletteIcon } from "@/shared/icons";
import { Button, Pagination, Table, TableBody, TableCell, TableCellActions, TableHead, TableHeader, TableNotFound, TableRow, TableSeparator } from "@/shared/ui"
import { cn, formatPrice, minuteFormat } from "@/shared/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronRightIcon } from "lucide-react";
import React from "react";
import { ServiceSort } from "./service-sort";

interface ServicesTableProps {
  services?: IServices[];
  meta: PaginationMeta;
  query: IServiceQuery;
}

export const ServicesTable = ({ services, meta, query }: ServicesTableProps) => {
  const navigate = useNavigate();

  return (
    <div className="mt-8 space-y-6">

      <ServiceSort {...query} />

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
                  <TableCell>{formatPrice(service.price)} ₽</TableCell>
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

      {meta.total_pages > 1 && <Pagination {...meta} />}
    </div>
  )
}
