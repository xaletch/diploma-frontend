import { PaletteIcon } from "@/shared/icons";
import { Empty } from "@/shared/ui"
import { EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/ui/empty/ui/empty"

export const ServiceNotFound = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <PaletteIcon />
        </EmptyMedia>
        <EmptyTitle>Услуга не найдена</EmptyTitle>
        <EmptyDescription>
          Услуга, которую вы ищете, не существует или была удалена.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
