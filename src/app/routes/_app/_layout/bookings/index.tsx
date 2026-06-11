import type { IBookingQuery } from '@/entities/booking'
import { Bookings } from '@/pages/booking'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout/bookings/')({
  validateSearch: (search: Record<string, unknown>): PaginationQuery & IBookingQuery => {
    return {
      page: search.page as number,
      limit: search.limit as number,
      customer: search.customer as string,
      employee: search.employee as string,
      service: search.service as string,
      tag: search.tag as string,
      status: search.status as BookingStatusType,
      sort: search.sort as SortType,
    };
  },
  component: RouteComponent,
})

function RouteComponent() {
  const query = Route.useSearch();
  return <Bookings query={query} />
}
