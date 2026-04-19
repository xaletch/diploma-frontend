import { BookingDetail } from '@/pages/booking'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout/bookings/$booking_id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <BookingDetail />
}
