import { useAccount } from "@/entities/account"
import { useGetEmployeeQuery } from "@/entities/employee"
import { AddIcon } from "@/shared/icons"
import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { EmployeeEmpty, EmployeeTable } from "@/widgets/employee"
import { TableLoading } from "@/widgets/loading"
import { Link } from "@tanstack/react-router"
import { useSelector } from "react-redux"

export const Employees = () => {
  const { location } = useSelector(useAccount);
  const { isLoading, data, isSuccess, isFetching } = useGetEmployeeQuery({ location_id: location?.id ?? "" });

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Сотрудники</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
          <Link to={"/employees/users/create"}>
            <Button 
              size={"size_44"} 
              animation={"toggle"}
              className={"text-sm font-bold"}
              iconLeft={<AddIcon width={21} height={21}/>}
            >Добавить</Button>
          </Link>
        </PageHeaderActions>
      </PageHeader>
      
      {isLoading && <TableLoading rows={4} />}
      {!isLoading && isSuccess && data.length ? (
        <EmployeeTable employees={data} isLoading={isLoading} isFetching={isFetching} />
      ) : (
        !isLoading && <EmployeeEmpty />
      )}
    </>
  )
}
