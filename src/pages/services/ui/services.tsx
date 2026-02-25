import { useGetServicesQuery } from "@/entities/services"
import { AddIcon } from "@/shared/icons"
import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { TableLoading } from "@/widgets/loading"
import { ServicesEmpty, ServicesTable } from "@/widgets/services"
import { Link } from "@tanstack/react-router"

export const Services = () => {
  const { data, isLoading, isSuccess } = useGetServicesQuery();

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Услуги</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
          <Link to={"/business/services/create"}>
            <Button 
              size={"size_44"} 
              animation={"toggle"}
              className={"text-sm font-bold"}
              iconLeft={<AddIcon width={21} height={21}/>}
            >Добавить</Button>
          </Link>
        </PageHeaderActions>
      </PageHeader>

      {isLoading && <TableLoading rows={4} />}
      {data && isSuccess && data.length ? (
        <ServicesTable services={data} />
      ): (
        !isLoading && <ServicesEmpty />
      )}
    </>
  )
}
