import { Button } from "@/shared/ui"
import { toast } from "sonner"

interface IDownloadCustomerDocumentProps {
  document_id: string;
}

export const DownloadCustomerDocument = ({ document_id }: IDownloadCustomerDocumentProps) => {
  return (
    <Button
      variant={"action"}
      size={"size_44"}
      className={"text-sm"}
      onClick={() => toast.success(document_id)}
    >Сохранить в docx</Button>
  )
}
