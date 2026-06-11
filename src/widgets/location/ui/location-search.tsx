import { Route } from "@/app/routes/_app/_layout/business/locations";
import type { ILocationQuery } from "@/entities/location"
import { useDebounce } from "@/shared/hooks";
import { Button, Card, CardContent, Search } from "@/shared/ui"
import { cn } from "@/shared/utils";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const variant = [1, 2, 3] as number[];

const LOCATION_STATUS: Record<number, string> = {
  1: 'Активные',
  2: 'Остановлены',
  3: 'Все',
};


export const LocationSearch = ({ active, search }: ILocationQuery) => {
  const navigate = useNavigate({ from: Route.fullPath });

  const [searchValue, setSearchValue] = useState<string>(search ?? "");

  const debouncedSearch = useDebounce(searchValue);

  const handleChange = (name: "active", value: number ) => {
    navigate({
      search: (p: ILocationQuery) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [name]: _, ...rest } = p;
        return value === 3 ? { ...rest } : { ...rest, [name]: value, page: 1 };
      }
    });
  }

  useEffect(() => {
    navigate({
      search: (p: ILocationQuery) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { search: _, ...rest } = p;
        return debouncedSearch ? { ...rest, search: debouncedSearch, page: 1 } : { ...rest };
      }
    });
  }, [debouncedSearch]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <Card>
          <CardContent className="p-2 gap-2 flex">
            {variant.map((v, idx) => (
              <Button
                key={idx}
                variant={"action"}
                className={cn((v === 3 ? !active : active === v) ? "bg-white" : "")}
                size={"size_40"}
                onClick={() => handleChange("active", v)}
              >{LOCATION_STATUS[v]}</Button>
            ))}
          </CardContent>
        </Card>

        <Search
          placeholder={"Поиск по названию и номеру телефона"}
          value={searchValue}
          onValueChange={setSearchValue}
        />
      </div>
    </div>
  )
}
