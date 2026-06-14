import { useGetBookingQuery } from "@/entities/booking";
import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui";
import { BookingNotFound } from "@/widgets/booking";

interface BookingEditProps {
  booking_id: string;
}

export const BookingEdit = ({ booking_id }: BookingEditProps) => {
  const { data, isLoading, isError } = useGetBookingQuery({ booking_id });
  
  if (isLoading || !data) return null;

  return (
    <>
      <PageHeader>
        <div>
          <PageHeaderTitle>Редактирование бронирования № {data?.tag}</PageHeaderTitle>
        </div>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      {isError && <BookingNotFound />}
    </>
  )
}
