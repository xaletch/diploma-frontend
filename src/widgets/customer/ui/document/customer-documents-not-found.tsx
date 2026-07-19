import { FolderOpenIcon } from "@/shared/icons";
import { Empty } from "@/shared/ui"
import { EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/ui/empty/ui/empty"

export const CustomerDocumentsNotFound = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <FolderOpenIcon />
        </EmptyMedia>
        <EmptyTitle>Заметки не найдены</EmptyTitle>
        <EmptyDescription>
          Не удалось загрузить заметки клиента.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
