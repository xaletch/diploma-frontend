import { useGetLocationQuery } from "@/entities/location"
import { PencilEditIcon } from "@/shared/icons"
import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { LocationDetails } from "@/widgets/location"
import { Link, useParams } from "@tanstack/react-router"

export const LocationDetail = () => {
  const { location_id } = useParams({ from: `/_app/_layout/business/locations/_location/$location_id` });
  const { data, isLoading } = useGetLocationQuery(location_id);

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Локация {data?.name}</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
          <Link to={`/business/locations/edit/${2}`}>
            <Button 
              size={"size_44"} 
              animation={"toggle"}
              className={"text-sm font-bold"}
              iconLeft={<PencilEditIcon width={21} height={21}/>}
            >Редактировать</Button>
          </Link>
        </PageHeaderActions>
      </PageHeader>

      <div className="mt-8">
        {isLoading && <div>load..</div>}

        {data && <LocationDetails location={data} />}
      </div>
    </>
  )
}
