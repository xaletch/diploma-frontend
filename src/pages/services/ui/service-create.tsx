import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from '@/shared/ui'
import { ServicesForm } from './components/services-form'
import { useCreateService } from '../model/hooks/service-create.hook';

export const ServiceCreate = () => {
  const { onSubmit, isLoading } = useCreateService();

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Создание услуги</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>
      
      <ServicesForm onSubmit={onSubmit} isLoading={isLoading} />
    </>
  )
}
