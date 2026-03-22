import { ServiceLocations } from '@/pages/services'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_layout/business/services/$service_id/locations/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <ServiceLocations />
}
