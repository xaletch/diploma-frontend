import { accountSelector } from "@/entities/account";
import { dialogSelector } from "@/entities/dialog";
import { useGetEmployeeQuery } from "@/entities/employee";
import { PencilEditIcon } from "@/shared/icons";
import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui";
import { EmployeeDetailLazy } from "@/widgets/employee";
import { DeleteMeAccount, ProfileInfo } from "@/widgets/profile";
import { Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";

export const Profile = () => {
  const { location, account } = useSelector(accountSelector);
  const { dialog } = useSelector(dialogSelector);
  
  const { data, isLoading, isError } = useGetEmployeeQuery({ location_id: location!.id, employee_id: account!.id });
  
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Профиль</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
          <Link to={`/employees/users/${data?.profile.id}/edit`}>
            <Button
              size={"size_44"}
              animation={"toggle"}
              className={"text-sm font-bold"}
              iconLeft={<PencilEditIcon width={21} height={21}/>}
              disabled={isLoading || isError}
            >Редактировать</Button>
          </Link>
        </PageHeaderActions>
      </PageHeader>

      {isLoading && <EmployeeDetailLazy />}
      {isError && <div className="text-center py-40">Ошибка</div>}
      {data && <ProfileInfo employee={data} />}

      {dialog.name === "me_delete" && <DeleteMeAccount />}
    </>
  )
}
