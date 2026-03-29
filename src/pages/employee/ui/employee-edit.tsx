import { useSelector } from "react-redux";
import { useParams } from "@tanstack/react-router";
import { useAccount } from "@/entities/account";
import { useGetEmployeeQuery } from "@/entities/employee";
import { EmployeeEditLazy, EmployeeNotFound } from "@/widgets/employee";
import { EmployeeEditWrapper } from "./components/employee-edit-wrapper";
import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui";

export const EmployeeEdit = () => {
  const { employee_id } = useParams({ from: "/_app/_layout/employees/users/$employee_id/edit/" });
  const { location } = useSelector(useAccount);
  const { data, isLoading, isError } = useGetEmployeeQuery({ location_id: location?.id, employee_id });

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Сотрудник - редактировать</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>
      {isLoading && <EmployeeEditLazy /> }
      {isError && <EmployeeNotFound />}
      {data && <EmployeeEditWrapper data={data} location_id={location!.id} />}
    </>
  )
}
