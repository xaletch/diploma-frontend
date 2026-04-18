import { useGetLocationQuery } from "@/entities/location"
import { Can } from "@/features/auth"
import { PencilEditIcon } from "@/shared/icons"
import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { LocationDetailLazy, LocationDetails, LocationNotFound } from "@/widgets/location"
import { Link, useParams } from "@tanstack/react-router"

export const LocationDetail = () => {
  const { location_id } = useParams({ from: `/_app/_layout/business/locations/_location/$location_id/` });
  const { data, isLoading, isError } = useGetLocationQuery(location_id);

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Локация {data?.name}</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
          <Can permission={"location:update"}>
            <Link to={`/business/locations/${data?.id}/edit`}>
              <Button 
                size={"size_44"} 
                animation={"toggle"}
                className={"text-sm font-bold"}
                iconLeft={<PencilEditIcon width={21} height={21}/>}
                disabled={isLoading || isError}
              >Редактировать</Button>
            </Link>
          </Can>
        </PageHeaderActions>
      </PageHeader>

      {isLoading && <LocationDetailLazy />}
      {isError && <LocationNotFound />}

      {data && <LocationDetails location={data} />}
    </>
  )
}
