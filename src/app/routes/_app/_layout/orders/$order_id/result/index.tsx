import { OrderResult } from '@/pages/orders';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_layout/orders/$order_id/result/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { order_id } = Route.useParams();
  return <OrderResult order_id={order_id} />
}
