import { Customer } from '@/pages/customer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout/customers/$customer_id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Customer />
}
