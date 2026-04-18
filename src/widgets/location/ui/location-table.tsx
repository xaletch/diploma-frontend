import type { ILocationResponse } from "@/entities/location"
import { Avatar } from "@/entities/user"
import { Can } from "@/features/auth";
import { LocationOnlineToggle } from "@/features/location";
import { ChevronRightIcon } from "@/shared/icons"
import { Badge, Button, Table, TableBody, TableCell, TableCellActions, TableHead, TableHeader, TableNotFound, TableRow, TableSeparator } from "@/shared/ui"
import { replaceAddress } from "@/shared/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import React from "react";

interface LocationTableProps {
  locations?: ILocationResponse[];
  isLoading: boolean;
}

export const LocationTable = ({ locations }: LocationTableProps) => {
  const navigate = useNavigate();
  return (
    <div className="mt-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Номер телефона</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {locations?.length ? 
            locations.map((loc, index) => (
              <React.Fragment key={index}>
                <TableRow onClick={() => navigate({ to: `/business/locations/${loc.id}` })}>
                  <TableCell>
                    <Avatar size={"large"} avatar_url={loc.avatar} name={loc.name.slice(0, 1)} id={loc.id} />
                    <div>
                      <p>{loc.name}</p>
                      <p className="text-11 leading-3 opacity-50 mt-px font-normal">{replaceAddress(loc.address.full_address)}</p>
                    </div>
                  </TableCell>
                  <TableCell>{loc.phone}</TableCell>
                  <TableCell>
                    <Badge variant={loc.is_active ? "online" : "offline"}>{loc.is_active ? "Онлайн" : "Офлайн"}</Badge>
                  </TableCell>
                  <TableCellActions>
                    <Can permission="location:delete">
                      <LocationOnlineToggle isOnline={loc.is_active} locationId={loc.id} />
                    </Can>
                    <Link to={`${loc.id}`}>
                      <Button variant={"white"} size={"icon_40"} animation={"toggle_sm"}>
                        <ChevronRightIcon width={17} height={17} />
                      </Button>
                    </Link>
                  </TableCellActions>
                </TableRow>
                {index !== locations.length - 1 && <TableSeparator />}
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
