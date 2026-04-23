import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { BookingCreateForm } from "@/widgets/booking"

export const BookingCreate = () => {
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Новое бронирование</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      <BookingCreateForm />
    </>
  )
}
