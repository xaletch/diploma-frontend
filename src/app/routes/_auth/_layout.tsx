import { OnlineHandler } from '@/app/providers/online'
import { NavigationHandler } from '@/features/navigation'
import { AuthLayout } from '@/widgets/layout'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <AuthLayout>
        <Outlet />
        <OnlineHandler />
        <NavigationHandler />
      </AuthLayout>
    </>
  )
}
