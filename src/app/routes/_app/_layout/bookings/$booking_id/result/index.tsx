import { BookingResult } from '@/pages/booking/ui/booking-result'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_layout/bookings/$booking_id/result/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { booking_id } = Route.useParams();
  return <BookingResult booking_id={booking_id} />
}
