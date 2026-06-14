import { BookingEdit } from '@/pages/booking';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_layout/bookings/$booking_id/edit/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { booking_id } = Route.useParams();
  return <BookingEdit booking_id={booking_id} />
}
