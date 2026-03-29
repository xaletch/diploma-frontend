import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { CustomerForm } from "./components/customer-form"
import { useCustomerCreate } from "../model/hooks/create.hook";

export const CustomerCreate = () => {
  const { onSubmit, isLoading } = useCustomerCreate();
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Новый клиент</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      <CustomerForm onSubmit={onSubmit} isLoading={isLoading} />
    </>
  )
}
