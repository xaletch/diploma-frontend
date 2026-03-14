import { EmployeeCreate } from '@/pages/employee'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout/employees/users/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <EmployeeCreate />
}
