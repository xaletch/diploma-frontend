import { ChevronRightIcon } from "@/shared/icons"
import { Badge, Button, Pagination, Table, TableBody, TableCell, TableCellActions, TableHead, TableHeader, TableNotFound, TableRow, TableSeparator } from "@/shared/ui"
import { formatPrice } from "@/shared/utils";
import { LazyBlur } from "@/widgets/loading";
import { Link, useNavigate } from "@tanstack/react-router";
import React from "react";
import type { IOrder, IOrderQuery } from "@/entities/orders";
import { PAYMENT_METHODS_ENUM } from "@/shared/constants/payment-methods.constant";
import { ORDER_STATUS } from "@/shared/constants/order-status.constant";
import { OrderSort } from "./order-sort";

interface OrderTableProps {
  orders?: IOrder[];
  isFetching: boolean;
  meta: PaginationMeta;
  query: IOrderQuery;
}

export const OrderTable = ({ orders, isFetching, meta, query}: OrderTableProps) => {
  const navigate = useNavigate();

  return (
    <div className="mt-8 space-y-6">
      
      <OrderSort {...query} />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Номер заказа</TableHead>
            <TableHead>Цена</TableHead>
            <TableHead>Способ оплаты</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody className="relative">
          {isFetching && <LazyBlur />}
          {orders?.length ? 
            orders.map((ord, index) => (
              <React.Fragment key={index}>
                <TableRow onClick={() => navigate({ to: (ord.status === "pending" || ord.status === "open" || ord.status === "unpaid" ? `/bookings/${ord.booking_ids[0]}/checkout` : `/bookings/${ord.booking_ids[0]}/result`) })}>
                  <TableCell>
                    {ord.tag ?? "-"}
                  </TableCell>
                  <TableCell>
                    {formatPrice(ord.subtotal ?? ord.total)} ₽
                  </TableCell>
                  <TableCell>
                    {ord.payment_method ? <Badge variant={`${ord.payment_method}_p`}>{PAYMENT_METHODS_ENUM[ord.payment_method]}</Badge> : "-"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={`${ord.status}`} className="px-2 py-0.5 text-xss! font-bold rounded-lg border-none text-white">{ORDER_STATUS[ord.status]}</Badge>
                  </TableCell>
                  <TableCellActions>
                    <Link to={`${ord.id}`}>
                      <Button variant={"white"} size={"icon_40"} animation={"toggle_sm"}>
                        <ChevronRightIcon width={17} height={17} />
                      </Button>
                    </Link>
                  </TableCellActions>
                </TableRow>
                {index !== orders.length - 1 && <TableSeparator />}
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
