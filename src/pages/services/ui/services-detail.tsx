import { useGetDetailServiceQuery } from "@/entities/services"
import { PencilEditIcon } from "@/shared/icons"
import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { ServiceDetailLazy, ServiceDetails, ServiceNotFound } from "@/widgets/services"
import { Link, useParams } from "@tanstack/react-router"

export const ServicesDetail = () => {
  const { service_id } = useParams({ from: "/_app/_layout/business/services/$service_id/" });
  const { data, isLoading, isError } = useGetDetailServiceQuery({ service_id });

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Услуга {data?.name && `- ${data.name}`}</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
          <Link to={`/business/services/${data?.id}/edit`}>
            <Button 
              size={"size_44"} 
              animation={"toggle"}
              className={"text-sm font-bold"}
              iconLeft={<PencilEditIcon width={21} height={21}/>}
              disabled={isLoading || isError}
            >Редактировать</Button>
          </Link>
        </PageHeaderActions>
      </PageHeader>

      {isLoading && <ServiceDetailLazy />}
      {isError && <ServiceNotFound />}
      {data && <ServiceDetails service={data} />}
    </>
  )
}
