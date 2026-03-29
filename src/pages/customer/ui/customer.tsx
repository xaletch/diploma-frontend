import { useGetCustomerQuery } from "@/entities/customers";
import { ArrowBackUpIcon } from "@/shared/icons"
import { Button, PageHeader, PageHeaderActions, PageHeaderTitle } from "@/shared/ui"
import { CustomerDetailLazy, CustomerDetails, CustomerNotFound } from "@/widgets/customer";
import { Link, useParams } from "@tanstack/react-router"

export const Customer = () => {
  const { customer_id } = useParams({ from: "/_app/_layout/customers/$customer_id/" });
  const { data, isLoading, isError } = useGetCustomerQuery({ customer_id });
  
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Клиент</PageHeaderTitle>
        <PageHeaderActions>
          <Link to={"/customers"}>
            <Button
              variant={"white"}
              animation={"toggle"}
              className={"px-5 text-sm font-bold"}
              size={"size_44"}
              iconLeft={<ArrowBackUpIcon width={24} height={24} />}
            >Назад</Button>
          </Link>
        </PageHeaderActions>
      </PageHeader>

      {isLoading && <CustomerDetailLazy />}
      {isError && <CustomerNotFound />}
      {data && <CustomerDetails customer={data} />}
    </>
  )
}
