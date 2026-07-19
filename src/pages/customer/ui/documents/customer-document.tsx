import { useGetCustomerDocumentQuery } from "@/entities/customers";
import { ArrowBackUpIcon } from "@/shared/icons";
import { Button } from "@/shared/ui";
import { CustomerDocumentLoading, CustomerDocumentNotFound, Editor, EditorHead } from "@/widgets/customer";

interface ICustomerDocumentProps {
  customer_id: string;
  document_id: string;
}

export const CustomerDocument = ({ customer_id, document_id }: ICustomerDocumentProps) => {
  const { data, isLoading, isError } = useGetCustomerDocumentQuery({ customer_id, document_id });

  return (
    <>
      <Button
        onClick={() => history.back()}
        variant={"transparent"}
        size={"icon_44"}
        className={"bg-white/50 hover:bg-white/90 sticky top-8 left-8"}
      ><ArrowBackUpIcon width={24} height={24} /></Button>

      {isLoading && <CustomerDocumentLoading />}
      {isError && <CustomerDocumentNotFound />}


      {data && (
        <div className="max-w-180 w-full mx-auto space-y-8 relative -mt-11">

          <EditorHead document_id={data.id} customer={data.customer} />

          <Editor
            data={data.content ?? undefined}
            name={data.name}
            customer_id={customer_id}
            document_id={document_id}
          />
        </div>
      )}
    </>
  )
}
