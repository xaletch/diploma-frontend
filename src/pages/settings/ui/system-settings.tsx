import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { SystemSettingContent } from "./system-setting-content"
import { useSettings } from "../model/hooks/settings.hook"

export const SystemSettings = () => {
  const { onSubmit, isLoading } = useSettings();

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Настройки системы</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
          <Button
            form={"setting-save"}
            animation={"toggle"}
            size={"size_44"}
            isLoading={isLoading}
            disabled={isLoading}
          >Сохранить</Button>
        </PageHeaderActions>
      </PageHeader>

      <SystemSettingContent onSubmit={onSubmit} />
    </>
  )
}
