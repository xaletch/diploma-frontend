import { accountSelector } from "@/entities/account";
import { useGetBookingsQuery } from "@/entities/booking"
import { Can } from "@/features/auth";
import { AddIcon } from "@/shared/icons";
import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { BookingEmpty, BookingTable } from "@/widgets/booking";
import { TableLoading } from "@/widgets/loading";
import { Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";

export const Bookings = () => {
  const { location } = useSelector(accountSelector);
  const { data, isLoading, isError, isSuccess, isFetching } = useGetBookingsQuery({ location_id: location!.id });
  
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

      {isLoading && <TableLoading rows={6} />}
      {isError && <>error message</>}

      {!isLoading && isSuccess && data.length ? (
        <BookingTable bookings={data} isLoading={isLoading} isFetching={isFetching} />
      ) : (
        !isLoading && <BookingEmpty />
      )}
    </>
  )
}
