import { Employees } from '@/pages/employee'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout/employees/users/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Employees />
}
