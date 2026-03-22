import { ServiceEdit } from '@/pages/services'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_layout/business/services/$service_id/edit/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <ServiceEdit />
}
