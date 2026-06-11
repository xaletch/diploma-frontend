import type { CustomerSortType, ICustomerQuery } from '@/entities/customers'
import { Customers } from '@/pages/customer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout/customers/')({
  validateSearch: (search: Record<string, unknown>): PaginationQuery & ICustomerQuery => {
    return {
      page: search.page as number,
      limit: search.limit as number,
      search: search.search as string,
      sort: search.sort as CustomerSortType,
    };
  },
  component: RouteComponent,
})

function RouteComponent() {
  const query = Route.useSearch();
  return <Customers query={query} />
}
