import { useGetBookingQuery } from "@/entities/booking";
import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui";
import { BookingCheckoutContent, BookingNotFound } from "@/widgets/booking";

interface BookingCheckoutProps {
  booking_id: string;
}

export const BookingCheckout = ({ booking_id }: BookingCheckoutProps) => {
  const { data, isLoading, isError } = useGetBookingQuery({ booking_id });
  
  if (isLoading || !data) return null;

  return (
    <>
      <PageHeader>
        <div>
          <PageHeaderTitle>Подтверждение заказа</PageHeaderTitle>
        </div>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      {isError && <BookingNotFound />}

      <BookingCheckoutContent booking={data} />
    </>
  )
}
