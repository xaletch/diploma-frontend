import { accountSelector } from "@/entities/account";
import { useGetBookingsQuery, type IBookingQuery } from "@/entities/booking"
import { Can } from "@/features/auth";
import { AddIcon } from "@/shared/icons";
import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { BookingEmpty, BookingTable } from "@/widgets/booking";
import { TableLoading } from "@/widgets/loading";
import { Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";

export interface BookingProps {
  query: IBookingQuery & PaginationQuery;
}

export const Bookings = ({ query }: BookingProps) => {
  const { location, account } = useSelector(accountSelector);
  const { data, isLoading, isError, isSuccess, isFetching } = useGetBookingsQuery(
    {
      ...query,
      location_id: location!.id,
    }
  );

  const hasActiveFilters = !query.customer || !query.employee || !query.service || !query.sort || !query.status || !query.tag;
  
  const content = isLoading ? (
    <TableLoading rows={6} />
  ) : isError ? (
    <>error message</>
  ) : isSuccess && (data.data.length > 0 && hasActiveFilters) ? (
    <BookingTable bookings={data.data} isFetching={isFetching} profileId={account?.id} meta={data.meta} query={query} />
  ) : (
    <BookingEmpty />
  );

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Записи</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
          <Can permission={"booking:create"}>
            <Link to={"/bookings/create"}>
              <Button 
                size={"size_44"}
                animation={"toggle"}
                className={"text-sm font-bold"}
                iconLeft={<AddIcon width={21} height={21}/>}
              >Новое бронирование</Button>
            </Link>
          </Can>
        </PageHeaderActions>
      </PageHeader>

      {content}
    </>
  )
}
