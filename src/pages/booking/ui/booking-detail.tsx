import { useGetBookingQuery } from "@/entities/booking";
import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { BookingDetails, BookingNotFound } from "@/widgets/booking";
import { AppLoading } from "@/widgets/loading";
import { useParams } from "@tanstack/react-router"

export const BookingDetail = () => {
  const { booking_id } = useParams({ from: "/_app/_layout/bookings/$booking_id/" });

  const { data, isLoading, isError } = useGetBookingQuery({ booking_id });

  return (
    <>
      <PageHeader>
        <div>
          <PageHeaderTitle>Бронирование №</PageHeaderTitle>
          {data && <p className="text-sm leading-4">{data.location.name}</p>}
        </div>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      {isLoading && <AppLoading/>}
      {isError && <BookingNotFound />}
      {data && <BookingDetails booking={data} />}
    </>
  )
}
