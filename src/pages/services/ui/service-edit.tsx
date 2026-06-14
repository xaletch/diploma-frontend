import { useGetDetailServiceQuery } from "@/entities/services";
import { PageHeader, PageHeaderTitle, PageHeaderActions, PageHeaderBackAction } from "@/shared/ui";
import { useParams } from "@tanstack/react-router";
import { ServicesForm } from "./components/services-form";
import { ServiceFormLazy, ServiceNotFound } from "@/widgets/services";
import { useEditService } from "../model/hooks/service-update.hook";

export const ServiceEdit = () => {
  const { service_id } = useParams({ from: "/_app/_layout/business/services/$service_id/edit/" });
  const { data, isLoading: isLoading, isError } = useGetDetailServiceQuery({ service_id });
  const { onSubmit, isLoading: isEdit } = useEditService(service_id);
  
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Редактировать услугу {data?.name && `- ${data.name}`}</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      {isLoading && <ServiceFormLazy />}
      {isError && <ServiceNotFound />}
      {data && <ServicesForm onSubmit={onSubmit} isLoading={isEdit} data={data} />}
    </>
  )
}
