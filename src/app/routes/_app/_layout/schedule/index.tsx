import { Schedule } from '@/pages/schedule'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout/schedule/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Schedule />
}
