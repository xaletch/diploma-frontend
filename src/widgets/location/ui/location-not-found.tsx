import { ShopIcon } from "@/shared/icons";
import { Empty } from "@/shared/ui"
import { EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/ui/empty/ui/empty"

export const LocationNotFound = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <ShopIcon />
        </EmptyMedia>
        <EmptyTitle>Локация не найдена</EmptyTitle>
        <EmptyDescription>
          Локацию, которую вы ищете, не существует или была удалена.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
