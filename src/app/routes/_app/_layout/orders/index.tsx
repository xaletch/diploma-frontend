import type { IOrderQuery, OrderSortType } from '@/entities/orders';
import { Orders } from '@/pages/orders'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout/orders/')({
  validateSearch: (search: Record<string, unknown>): IOrderQuery => {
    return {
      page: search.page as number,
      limit: search.limit as number,
      status: search.status as OrderStatusType,
      sort: search.sort as OrderSortType,
    };
  },
  component: RouteComponent,
})

function RouteComponent() {
  const query = Route.useSearch();
  return <Orders query={query} />
}
