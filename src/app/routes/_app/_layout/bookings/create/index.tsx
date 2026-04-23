import { BookingCreate } from '@/pages/booking'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout/bookings/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <BookingCreate />
}
