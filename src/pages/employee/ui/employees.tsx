import { useGetEmployeeQuery } from "@/entities/employee"
import { AddIcon } from "@/shared/icons"
import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { EmployeeEmpty, EmployeeTable } from "@/widgets/employee"
import { TableLoading } from "@/widgets/loading"
import { Link } from "@tanstack/react-router"

export const Employees = () => {
  const { isLoading, data, isSuccess } = useGetEmployeeQuery();
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
        <EmployeeTable employees={data} isLoading={isLoading} />
      ) : (
        !isLoading && <EmployeeEmpty />
      )}
    </>
  )
}
