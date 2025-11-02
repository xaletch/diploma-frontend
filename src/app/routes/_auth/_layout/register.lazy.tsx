import { Register } from '@/pages/auth/ui/register'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/_layout/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Register />
}
