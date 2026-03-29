import { EmployeeEdit } from '@/pages/employee'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_layout/employees/users/$employee_id/edit/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <EmployeeEdit />
}
