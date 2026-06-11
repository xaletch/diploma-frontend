import { useGetLocationsQuery, type ILocationQuery } from "@/entities/location"
import { Can } from "@/features/auth";
import { AddIcon } from "@/shared/icons"
import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { TableLoading } from "@/widgets/loading";
import { LocationEmpty, LocationTable } from "@/widgets/location";
import { Link } from "@tanstack/react-router";

interface LocationProps {
  query: ILocationQuery & PaginationQuery;
}

export const Locations = ({ query }: LocationProps) => {
  const { data: locations, isLoading, isSuccess, isFetching } = useGetLocationsQuery({ 
    active: 1,
    ...query
  });

  const hasActiveFilters = !query.active || !query.category || !query.name || !query.search;

  const content = isLoading ? (
    <TableLoading rows={4} />
  ) : isSuccess && (locations.data.length > 0 || hasActiveFilters) ? (
    <LocationTable locations={locations.data} isFetching={isFetching} meta={locations.meta} query={query} />
  ) : (
    <LocationEmpty />
  );

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

      {content}
    </>
  )
}
