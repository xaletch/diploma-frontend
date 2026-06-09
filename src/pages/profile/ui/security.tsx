import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { ChangePassword } from "@/widgets/profile"

export const Security = () => {
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Профиль - Безопасность</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      <div className="mt-8 max-w-140 w-full mx-auto space-y-8 relative">
        <ChangePassword />
      </div>
    </>
  )
}
