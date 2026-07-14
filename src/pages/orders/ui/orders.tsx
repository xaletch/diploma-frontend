import { useGetOrdersQuery, type IOrderQuery } from "@/entities/orders";
import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { TableLoading } from "@/widgets/loading";
import { OrderEmpty, OrderTable } from "@/widgets/orders";

export interface OrderProps {
  query: IOrderQuery;
}

export const Orders = ({ query }: OrderProps) => {
  const { data, isLoading, isError, isSuccess, isFetching } = useGetOrdersQuery({ ...query });

  const hasActiveFilters = !query.sort || !query.status;
  
  const content = isLoading ? (
    <TableLoading rows={6} />
  ) : isError ? (
    <>error message</>
  ) : isSuccess && (data.data.length > 0 && hasActiveFilters) ? (
    <OrderTable orders={data.data} isFetching={isFetching} meta={data.meta} query={query} />
  ) : (
    <OrderEmpty />
  );

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Платежи</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      {content}
    </>
  )
}
