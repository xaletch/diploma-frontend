import { accountSelector } from "@/entities/account";
import { dialogSelector } from "@/entities/dialog";
import { useGetEmployeeQuery } from "@/entities/employee";
import { Can } from "@/features/auth";
import { ArrowBackUpIcon, PencilEditIcon } from "@/shared/icons"
import { Button, PageHeader, PageHeaderActions, PageHeaderTitle } from "@/shared/ui"
import { EmployeeDetailLazy, EmployeeDetails, EmployeeNotFound, EmployeeDeleteDialog } from "@/widgets/employee";
import { Link, useParams } from "@tanstack/react-router"
import { useSelector } from "react-redux";

export const EmployeeDetail = () => {
  const { employee_id } = useParams({ from: "/_app/_layout/employees/users/$employee_id/" });
  const { location } = useSelector(accountSelector);
  const { dialog } = useSelector(dialogSelector);

  const { data, isLoading, isError } = useGetEmployeeQuery({ location_id: location?.id, employee_id });

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Сотрудник</PageHeaderTitle>
        <PageHeaderActions>
          <Link to={"/employees/users"}>
            <Button
              variant={"white"}
              animation={"toggle"}
              className={"px-5 text-sm font-bold"}
              size={"size_44"}
              iconLeft={<ArrowBackUpIcon width={24} height={24} />}
            >Назад</Button>
          </Link>
          <Can permission={"employee:update"}>
            <Link to={`edit`}>
              <Button
                size={"size_44"}
                animation={"toggle"}
                className={"text-sm font-bold"}
                iconLeft={<PencilEditIcon width={21} height={21}/>}
                disabled={isLoading || isError}
              >Редактировать</Button>
            </Link>
          </Can>
        </PageHeaderActions>
      </PageHeader>

      {isLoading && <EmployeeDetailLazy />}
      {isError && <EmployeeNotFound />}
      {data && <EmployeeDetails employee={data} locationId={location!.id} />}

      {/* ===== DIALOGS ===== */}
      {dialog.name === "delete_employee" && <EmployeeDeleteDialog employee={dialog.data} />}
    </>
  )
}
