import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout/employees/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Navigate to={"/employees/users"} />
}
