import type { EmployeeStatus, IEmployeeQuery } from '@/entities/employee'
import { Employees } from '@/pages/employee'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout/employees/users/')({
  validateSearch: (search: Record<string, unknown>): PaginationQuery & IEmployeeQuery => {
    return {
      page: search.page as number,
      limit: search.limit as number,
      search: search.search as string,
      role: search.role as RoleType,
      status: search.status as EmployeeStatus,
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const query = Route.useSearch();
  return <Employees query={query} />
}
