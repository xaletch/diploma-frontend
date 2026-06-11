import type { ILocationQuery } from '@/entities/location'
import { Locations } from '@/pages/location'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout/business/locations/')({
  validateSearch: (search: Record<string, unknown>): ILocationQuery & PaginationQuery => {
    return {
      page: search.page as number,
      limit: search.limit as number,
      name: search.name as string,
      search: search.search as string,
      category: search.category as string,
      active: search.active as number,
    };
  },
  component: RouteComponent,
})

function RouteComponent() {
  const query = Route.useSearch();
  return <Locations query={query} />
}
