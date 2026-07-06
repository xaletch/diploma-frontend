import { useGetOrderQuery } from "@/entities/orders";
import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui";
import { OrderNotFound } from "@/widgets/orders";

interface OrderCheckoutProps {
  order_id: string;
}

export const OrderCheckout = ({ order_id }: OrderCheckoutProps) => {
  const { data, isLoading, isError } = useGetOrderQuery({ order_id });
  
  if (isLoading || !data) return null;

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

      {isError && <OrderNotFound order_id={order_id} />}

      {/* <OrderCheckoutContent booking={data} /> */}
    </>
  )
}
