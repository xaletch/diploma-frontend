import { LocationDetail } from '@/pages/location'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_layout/business/locations/_location/$location_id/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <LocationDetail />
}
