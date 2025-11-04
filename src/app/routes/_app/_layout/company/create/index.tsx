import { CompanyCreate } from '@/pages/company'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout/company/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CompanyCreate />
}
