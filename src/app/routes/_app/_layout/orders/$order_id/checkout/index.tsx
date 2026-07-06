import { BookingCheckout } from '@/pages/booking'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_layout/orders/$order_id/checkout/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { booking_id } = Route.useParams();
  return <BookingCheckout booking_id={booking_id} />
}
