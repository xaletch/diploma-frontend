import { EmployeeDetail } from '@/pages/employee'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_layout/employees/users/$employee_id/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <EmployeeDetail />
}
