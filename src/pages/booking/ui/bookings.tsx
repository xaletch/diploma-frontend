import { accountSelector } from "@/entities/account";
import { useGetBookingsQuery } from "@/entities/booking"
import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { BookingTable } from "@/widgets/booking";
import { TableLoading } from "@/widgets/loading";
import { useSelector } from "react-redux";

export const Bookings = () => {
  const { location } = useSelector(accountSelector);
  const { data, isLoading, isError, isFetching } = useGetBookingsQuery({ location_id: location!.id });
  
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Записи</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      {isLoading && <TableLoading rows={6} />}
      {isError && <>error message</>}
      {data && <BookingTable bookings={data}  isLoading={isLoading} isFetching={isFetching} />}
    </>
  )
}
