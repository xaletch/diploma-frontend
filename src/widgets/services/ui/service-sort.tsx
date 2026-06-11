import { Route } from "@/app/routes/_app/_layout/business/services";
import type { IServiceQuery } from "@/entities/services"
import { useDebounce } from "@/shared/hooks";
import { Search } from "@/shared/ui";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const ServiceSort = ({ search }: IServiceQuery) => {
  const navigate = useNavigate({ from: Route.fullPath });

  const [searchValue, setSearchValue] = useState<string>(search ?? "");

  const debouncedSearch = useDebounce(searchValue);

  useEffect(() => {
    navigate({
      search: (p: IServiceQuery) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { search: _, ...rest } = p;
        return debouncedSearch ? { ...rest, search: debouncedSearch, page: 1 } : { ...rest };
      }
    });
  }, [debouncedSearch]);

  return (
    <div className="flex items-center justify-end">
      <Search
        className={"max-w-70!"}
        placeholder={"Поиск по названию"}
        value={searchValue}
        onValueChange={setSearchValue}
      />
    </div>
  )
}
