import { accountSelector } from "@/entities/account"
import { useGetEmployeesQuery } from "@/entities/employee"
import { Can } from "@/features/auth"
import { AddIcon } from "@/shared/icons"
import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { EmployeeEmpty, EmployeeTable } from "@/widgets/employee"
import { TableLoading } from "@/widgets/loading"
import { Link } from "@tanstack/react-router"
import { useSelector } from "react-redux"

export const Employees = () => {
  const { location } = useSelector(accountSelector);
  const { isLoading, data, isSuccess, isFetching } = useGetEmployeesQuery({ location_id: location?.id ?? "" });

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Сотрудники</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
          <Can permission={"employee:invite"}>
            <Link to={"/employees/users/create"}>
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
      {!isLoading && isSuccess && data.length ? (
        <EmployeeTable employees={data} isLoading={isLoading} isFetching={isFetching} />
      ) : (
        !isLoading && <EmployeeEmpty />
      )}
    </>
  )
}
