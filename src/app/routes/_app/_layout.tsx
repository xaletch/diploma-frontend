import { PrivateRoute } from '@/features/auth'
import { AppLayout } from '@/widgets/layout'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PrivateRoute>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </PrivateRoute>
  )
}
