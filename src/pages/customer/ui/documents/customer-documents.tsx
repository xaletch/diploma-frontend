import { useGetCustomerDocumentsQuery, type ICustomerDocumentQuery } from "@/entities/customers";
import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { CustomerDocumentsLoading, CustomerDocumentsNotFound, CustomerDocumentsTable } from "@/widgets/customer";

interface ICustomerDocumentsProps {
  query: PaginationQuery & ICustomerDocumentQuery;
  customer_id: string;
}

export const CustomerDocuments = ({ query, customer_id }: ICustomerDocumentsProps) => {

  const { data, isLoading, isError } = useGetCustomerDocumentsQuery({
    customer_id,
    query: {
      page: query.page,
      limit: query.limit,
    },
  }, { refetchOnMountOrArgChange: true });

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Заметки клиента {query.full_name && `- ${query.full_name}`}</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />

        </PageHeaderActions>
      </PageHeader>
    
      {isLoading && <CustomerDocumentsLoading />}
      {isError && <CustomerDocumentsNotFound />}
      {data && <CustomerDocumentsTable documents={data.data} meta={data.meta} />}
    </>
  )
}
