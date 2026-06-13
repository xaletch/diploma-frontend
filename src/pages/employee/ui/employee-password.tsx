import { Route } from "@/app/routes/_app/_layout/employees/users/$employee_id/password";
import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { EmployeeChangePassword } from "@/widgets/employee"

export const EmployeePassword = () => {
  const { employee_id } = Route.useParams();
  
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Изменение пароля</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      <EmployeeChangePassword employee_id={employee_id} />
    </>
  )
}
