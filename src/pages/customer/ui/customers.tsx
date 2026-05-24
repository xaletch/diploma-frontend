import { useGetCustomersQuery } from "@/entities/customers";
import { AddIcon } from "@/shared/icons";
import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui";
import { CustomerEmpty, CustomerTable } from "@/widgets/customer";
import { TableLoading } from "@/widgets/loading";
import { Link } from "@tanstack/react-router";

export const Customers = () => {
  const { isLoading, data, isSuccess, isFetching } = useGetCustomersQuery();

  const content = isLoading ? (
    <TableLoading rows={3} />
  ) : isSuccess && data.length > 0 ? (
    <CustomerTable customers={data} isFetching={isFetching} />
  ) : (
    <CustomerEmpty />
  );

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Клиенты</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
          <Link to={"/customers/create"}>
            <Button 
              size={"size_44"} 
              animation={"toggle"}
              className={"text-sm font-bold"}
              iconLeft={<AddIcon width={21} height={21}/>}
            >Добавить</Button>
          </Link>
        </PageHeaderActions>
      </PageHeader>
      
      {content}
    </>
  )
}
