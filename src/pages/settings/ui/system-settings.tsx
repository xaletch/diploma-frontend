import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { SystemSettingContent } from "./system-setting-content"

export const SystemSettings = () => {
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Настройки системы</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
          <Button form={"setting-save"} animation={"toggle"} size={"size_44"}>Сохранить</Button>
        </PageHeaderActions>
      </PageHeader>

      <SystemSettingContent />
    </>
  )
}
