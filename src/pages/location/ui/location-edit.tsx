import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { LocationEditForm } from "./components/location-edit-form"
import { useGetLocationQuery } from "@/entities/location";
import { useParams } from "@tanstack/react-router";
import { LocationNotFound } from "@/widgets/location";

export const LocationEdit = () => {
  const { location_id } = useParams({ from: `/_app/_layout/business/locations/_location/$location_id/edit/` });
  const { data, isLoading, isError } = useGetLocationQuery(location_id);
  console.log(data);

  if (isLoading || !data) return null;

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Редактировать локацию</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      {isError && <LocationNotFound />}

      {data && <LocationEditForm location={data} />}
    </>
  )
}
