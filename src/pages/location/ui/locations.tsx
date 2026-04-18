import { useGetLocationsQuery } from "@/entities/location"
import { Can } from "@/features/auth";
import { AddIcon } from "@/shared/icons"
import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { TableLoading } from "@/widgets/loading";
import { LocationEmpty, LocationTable } from "@/widgets/location";
import { Link } from "@tanstack/react-router";

export const Locations = () => {
  const { data: locations, isLoading, isSuccess } = useGetLocationsQuery();

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Локации</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
          <Can permission={"location:create"}>
            <Link to={"/business/locations/create"}>
              <Button 
                size={"size_44"} 
                animation={"toggle"}
                className={"text-sm font-bold"}
                iconLeft={<AddIcon width={21} height={21}/>}
              >Добавить</Button>
            </Link>
          </Can>
        </PageHeaderActions>
      </PageHeader>

      {isLoading && <TableLoading rows={4} />}
      {!isLoading && isSuccess && locations.length ? (
        <LocationTable locations={locations} isLoading={isLoading} />
      ) : (
        !isLoading && <LocationEmpty />
      )}
    </>
  )
}
