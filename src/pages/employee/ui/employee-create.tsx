import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { EmployeeInviteForm } from "./components/employee-invite-form"

export const EmployeeCreate = () => {
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Новый сотрудник</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      <EmployeeInviteForm />
    </>
  )
}
