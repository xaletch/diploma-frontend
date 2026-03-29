import { CustomerCreate } from '@/pages/customer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout/customers/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CustomerCreate />
}
