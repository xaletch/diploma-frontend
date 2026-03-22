import { useLocationsQuery } from "@/entities/directories";
import { useGetDetailServiceQuery } from "@/entities/services";
import { PageHeader, PageHeaderTitle, PageHeaderActions, PageHeaderBackAction } from "@/shared/ui"
import { ServiceLocationSetting, ServiceSettingLazy } from "@/widgets/services"
import { useParams } from "@tanstack/react-router";

export const ServiceLocations = () => {
  const { service_id } = useParams({ from: "/_app/_layout/business/services/$service_id/locations/" });
  const { data, isLoading } = useLocationsQuery();
  const { data: locations, isLoading: loading } = useGetDetailServiceQuery({ service_id });
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Локации</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      {isLoading && <ServiceSettingLazy />}
      {data && <ServiceLocationSetting service_id={service_id} data={data} isLoading={loading} locations={locations?.locations ?? []} />}
    </>
  )
}
