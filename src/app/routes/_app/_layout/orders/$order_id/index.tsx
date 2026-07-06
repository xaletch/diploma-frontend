import { OrderDetail } from '@/pages/orders'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout/orders/$order_id/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { order_id } = Route.useParams();
  return <OrderDetail order_id={order_id} />
}
