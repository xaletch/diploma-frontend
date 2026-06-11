import { Route } from "@/app/routes/_app/_layout/customers";
import type { ICustomerQuery } from "@/entities/customers";
import { useDebounce } from "@/shared/hooks";
import { Search } from "@/shared/ui";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const CustomerSort = ({ search }: ICustomerQuery) => {
  const navigate = useNavigate({ from: Route.fullPath });

  const [searchValue, setSearchValue] = useState<string>(search ?? "");

  const debouncedSearch = useDebounce(searchValue);

  useEffect(() => {
    navigate({
      search: (p: ICustomerQuery) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { search: _, ...rest } = p;
        return debouncedSearch ? { ...rest, search: debouncedSearch, page: 1 } : { ...rest };
      }
    });
  }, [debouncedSearch]);

  return (
    <div className="flex items-center justify-end">
      <Search
        placeholder={"Поиск по имени, email и номеру телефона"}
        value={searchValue}
        onValueChange={setSearchValue}
      />
    </div>
  )
}
