import { Security } from '@/pages/profile'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout/me/security/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Security />
}
