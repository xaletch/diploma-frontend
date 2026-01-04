import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout/settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>settings</div>
}
