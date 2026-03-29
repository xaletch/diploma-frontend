import { useAccount } from "@/entities/account";
import { useServicesQuery } from "@/entities/directories";
import { useGetEmployeeQuery } from "@/entities/employee";
import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { EmployeeNotFound, EmployeeServiceSetting, EmployeeServiceSettingLazy } from "@/widgets/employee";
import { useParams } from "@tanstack/react-router"
import { useSelector } from "react-redux";

export const EmployeeServices = () => {
  const { employee_id } = useParams({ from: "/_app/_layout/employees/users/$employee_id/services/" });
  const { location } = useSelector(useAccount);

  const { data: employee, isLoading: isLoadingEmployee, isError: isErrorEmployee } = useGetEmployeeQuery({ location_id: location?.id, employee_id });
  const { data: services, isLoading: isLoadingServices } = useServicesQuery();

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Услуги</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      {isLoadingServices && <EmployeeServiceSettingLazy />}
      {isErrorEmployee && <EmployeeNotFound />}
      {services && (
        <EmployeeServiceSetting
          employee_id={employee_id}
          isLoading={isLoadingEmployee}
          services={services}
          location_id={location!.id}
          active_service={employee?.services ?? []}
        />
      )
      }
    </>
  )
}
