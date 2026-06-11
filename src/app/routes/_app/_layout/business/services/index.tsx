import type { IServiceQuery, ServicePriceSort, ServiceStatusType } from '@/entities/services'
import { Services } from '@/pages/services'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout/business/services/')({
  validateSearch: (search: Record<string, unknown>): PaginationQuery & IServiceQuery => {
    return {
      page: search.page as number,
      limit: search.limit as number,
      search: search.search as string,
      type: search.type as ServiceStatusType,
      mark: search.mark as MarkType,
      price_sort: search.price_sort as ServicePriceSort,
    };
  },
  component: RouteComponent,
})

function RouteComponent() {
  const query = Route.useSearch();
  return <Services query={query} />
}
