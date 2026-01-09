import { AddIcon } from "@/shared/icons"
import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"

export const Locations = () => {
  return (
    <div>

      <PageHeader>
        <PageHeaderTitle>Локации</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
          <Button 
            size={"size_48"} 
            animation={"toggle"}
            iconLeft={<AddIcon width={22} height={22}/>}
          >Добавить</Button>
        </PageHeaderActions>
      </PageHeader>

    </div>
  )
}
