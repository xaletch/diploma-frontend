import { useGetServicesQuery } from "@/entities/services"
import { Can } from "@/features/auth"
import { AddIcon } from "@/shared/icons"
import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { TableLoading } from "@/widgets/loading"
import { ServicesEmpty, ServicesTable } from "@/widgets/services"
import { Link } from "@tanstack/react-router"

export const Services = () => {
  const { data, isLoading, isSuccess } = useGetServicesQuery();

  const content = isLoading ? (
    <TableLoading rows={4} />
  ) : isSuccess && data.length > 0 ? (
    <ServicesTable services={data} />
  ) : (
    <ServicesEmpty />
  );

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Услуги</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
          <Can permission={"service:create"}>
            <Link to={"/business/services/create"}>
              <Button 
                size={"size_44"} 
                animation={"toggle"}
                className={"text-sm font-bold"}
                iconLeft={<AddIcon width={21} height={21}/>}
              >Добавить</Button>
            </Link>
          </Can>
        </PageHeaderActions>
      </PageHeader>

      {content}
    </>
  )
}
