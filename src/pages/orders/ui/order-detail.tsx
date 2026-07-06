import { useGetOrderQuery } from "@/entities/orders";
import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui";
import { AppLoading } from "@/widgets/loading";
import { OrderNotFound } from "@/widgets/orders";

interface OrderDetailProps {
  order_id: string;
}

export const OrderDetail = ({ order_id }: OrderDetailProps) => {

  const { data, isLoading, isError } = useGetOrderQuery({ order_id });

  return (
    <>
    
      <PageHeader>
        <div>
          <PageHeaderTitle>Заказ № {data?.tag}</PageHeaderTitle>
        </div>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      {isLoading && <AppLoading/>}
      {isError && <OrderNotFound order_id={order_id} />}
    </>
  )
}
