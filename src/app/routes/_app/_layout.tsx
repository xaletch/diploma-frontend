import { OnlineHandler } from '@/app/providers/online'
import { PrivateRoute } from '@/features/auth'
import { NavigationHandler } from '@/features/navigation'
import { AppLayout, NotFound } from '@/widgets/layout'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout')({
  component: RouteComponent,
  notFoundComponent: () => <NotFound />
})

function RouteComponent() {
  return (
    <PrivateRoute>
      <AppLayout>
        <Outlet />
      </AppLayout>
      <OnlineHandler />
      <NavigationHandler />
    </PrivateRoute>
  )
}
