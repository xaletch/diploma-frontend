import { FolderOpenIcon } from "@/shared/icons";
import { Empty } from "@/shared/ui"
import { EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/ui/empty/ui/empty"

export const CustomerDocumentNotFound = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <FolderOpenIcon />
        </EmptyMedia>
        <EmptyTitle>Заметка не найдена</EmptyTitle>
        <EmptyDescription>
          Заметка, не существует или была удалена.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
