import type { IEmployeeDetail } from "@/entities/employee";
import { Avatar } from "@/entities/user";
import { Can } from "@/features/auth";
import { Copyable } from "@/features/copyable";
import { DeleteAccountAction } from "@/features/profile";
import { EMPLOYEE_STATUS, ROLE } from "@/shared/constants";
import { Badge, Card, CardContent, CardContentLabel, CardContentLabelDescription, CardContentLabelTitle, CardDescription, CardHeader, CardTitle } from "@/shared/ui"
import { AvatarGroup } from "@/shared/ui/avatar";
import { Link } from "@tanstack/react-router";

interface ProfileInfoProps {
  employee: IEmployeeDetail;
}

export const ProfileInfo = ({ employee }: ProfileInfoProps) => {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-5 gap-8 w-full">
        <div className="col-span-3 space-y-8">
          <Card>
            <CardHeader className="flex-row items-center gap-4">
              <div className="relative">
                <Avatar size={"xl"} id={employee.profile.id} name={employee.profile.first_name} avatar_url={employee.profile.avatar} />
              </div>
              <div className="flex justify-between gap-4 flex-1">
                <div className="space-y-0.5 flex-1">
                  <CardTitle className="capitalize">{employee.profile.full_name}</CardTitle>
                  <CardDescription className="opacity-50">{ROLE[employee.profile.role.name]}{employee.profile.position && `, ${employee.profile.position}`}</CardDescription>
                </div>
                <div>
                  {employee.is_banned ? 
                    <Badge variant={"inactive"}>Заблокирован</Badge> :
                    <Badge variant={employee.profile.status}>{EMPLOYEE_STATUS[employee.profile.status]}</Badge>
                  }
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Профиль</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 pt-0">
              <CardContentLabel>
                <CardContentLabelTitle>Email</CardContentLabelTitle>
                <CardContentLabelDescription>
                  <Copyable text={employee.profile.email}/>
                </CardContentLabelDescription>
              </CardContentLabel>

              <CardContentLabel>
                <CardContentLabelTitle>Номер телефона</CardContentLabelTitle>
                <CardContentLabelDescription>
                  <Copyable text={employee.profile.phone}/>
                </CardContentLabelDescription>
              </CardContentLabel>

              <CardContentLabel>
                <CardContentLabelTitle>Дата рождения</CardContentLabelTitle>
                <CardContentLabelDescription>{employee.profile.birthday ? employee.profile.birthday : "-"}</CardContentLabelDescription>
              </CardContentLabel>

            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Права доступа</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 pt-0">

              <CardContentLabel>
                <CardContentLabelTitle>Роль</CardContentLabelTitle>
                <CardContentLabelDescription>{ROLE[employee.profile.role.name]}</CardContentLabelDescription>
              </CardContentLabel>

              <CardContentLabel>
                <CardContentLabelTitle>Должность</CardContentLabelTitle>
                <CardContentLabelDescription className="capitalize">{employee.profile.position}</CardContentLabelDescription>
              </CardContentLabel>

            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col col-span-2 space-y-6">
          <Link to={`/schedule`}>
            <Card>
              <CardHeader>
                <CardTitle>Расписание</CardTitle>
                <CardDescription>Проверьте график работы и внесите необходимые изменения.</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Can permission="directory:services">
            <AvatarGroup title={"Услуги"} to={`/employees/users/${employee.profile.id}/services`} data={employee.services} />
          </Can>

          <Link to={"security"}>
            <Card>
              <CardHeader>
                <CardTitle>Безопасность</CardTitle>
                <CardDescription>Смена пароля и Двухфакторная аутентификация.</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to={"/logout"}>
            <Card>
              <CardHeader>
                <CardTitle className="text-red">Выйти</CardTitle>
                <CardDescription>Выход из системы.</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <DeleteAccountAction profile_id={employee.profile.id} />
        </div>
        
      </div>
    </div>
  )
}
