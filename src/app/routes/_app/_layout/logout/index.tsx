import { Logout } from '@/pages/logout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout/logout/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Logout />
}
