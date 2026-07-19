import type { ICustomerDocumentProfileInfo } from "@/entities/customers";
import { Avatar } from "@/entities/user";
import { Card, CardContent, CardTitle } from "@/shared/ui";
import { Link } from "@tanstack/react-router";

interface IEditorHeadProps {
  document_id: string;
  customer: ICustomerDocumentProfileInfo;
}

export const EditorHead = ({ customer }: IEditorHeadProps) => {
  return (
    <div>
      <Card>
        <CardContent className="flex items-center justify-between p-5.5">
          <div className="flex items-center gap-2.5">
            <Avatar size={"size_74"} id={customer.id} avatar_url={customer.profile.avatar} name={customer.profile.full_name} />
            <div>
              <CardTitle>{customer.profile.full_name}</CardTitle>
              <Link className="text-xs opacity-50 hover:opacity-80 duration-200" to={`tel:${customer.profile.phone}`}>{customer.profile.phone}</Link>
            </div>
          </div>
          <div>
            {/* <DownloadCustomerDocument document_id={document_id} /> */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
