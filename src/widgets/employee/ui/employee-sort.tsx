import { Route } from "@/app/routes/_app/_layout/employees/users";
import type { EmployeeStatus, IEmployeeQuery } from "@/entities/employee";
import { useDebounce } from "@/shared/hooks";
import { Button, Card, CardContent, Search } from "@/shared/ui"
import { cn } from "@/shared/utils";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const variant = ["all", "active", "disable", "invited"] as EmployeeStatus[] | "all"[];

const EMPLOYEE_STATUS: Record<EmployeeStatus | "all", string> = {
  all: "Все",
  active: "Активные",
  disable: "Не активные",
  invited: "Приглашение отправлено",
};

export const EmployeeSort = ({ status, search }: IEmployeeQuery) => {
  const navigate = useNavigate({ from: Route.fullPath });

  const [searchValue, setSearchValue] = useState<string>(search ?? "");

  const debouncedSearch = useDebounce(searchValue);

  const handleChange = (name: "status", value: EmployeeStatus | "all" ) => {
    navigate({
      search: (p: IEmployeeQuery) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [name]: _, ...rest } = p;
        return value === "all" ? { ...rest } : { ...rest, [name]: value, page: 1 };
      }
    });
  }

  useEffect(() => {
    navigate({
      search: (p: IEmployeeQuery) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { search: _, ...rest } = p;
        return debouncedSearch ? { ...rest, search: debouncedSearch, page: 1 } : { ...rest };
      }
    });
  }, [debouncedSearch]);

  return (
    <div className="flex items-center justify-between">
      <Card>
        <CardContent className="p-2 gap-2 flex">
          {variant.map((v, idx) => (
            <Button
              key={idx}
              variant={"action"}
              className={cn((v === "all" ? !status : status === v) ? "bg-white" : "")}
              size={"size_40"}
              onClick={() => handleChange("status", v)}
            >{EMPLOYEE_STATUS[v]}</Button>
          ))}
        </CardContent>
      </Card>

      <Search
        placeholder={"Поиск по имени и номеру телефона"}
        value={searchValue}
        onValueChange={setSearchValue}
      />
    </div>
  )
}
