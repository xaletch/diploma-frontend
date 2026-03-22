import { useEmployeesQuery } from "@/entities/directories"
import { useGetDetailServiceQuery } from "@/entities/services";
import { PageHeader, PageHeaderTitle, PageHeaderActions, PageHeaderBackAction } from "@/shared/ui"
import { ServiceEmployeeSetting, ServiceSettingLazy } from "@/widgets/services";
import { useParams } from "@tanstack/react-router";

export const ServiceEmployees = () => {
  const { service_id } = useParams({ from: "/_app/_layout/business/services/$service_id/employees/" });
  const { data, isLoading } = useEmployeesQuery();
  const { data: employee, isLoading: loading } = useGetDetailServiceQuery({ service_id });

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Сотрудники</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      {isLoading && <ServiceSettingLazy />}
      {data && <ServiceEmployeeSetting service_id={service_id} data={data} employee={employee?.users ?? []} isLoading={loading} />}
    </>
  )
}
