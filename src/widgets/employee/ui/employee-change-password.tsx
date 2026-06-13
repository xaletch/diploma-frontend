import { employeeChangePasswordSchema, useEmployeeChangePassword } from "@/features/employee";
import { Button, Form, InputForm } from "@/shared/ui"

interface EmployeeChangePasswordProps {
  employee_id: string;
}

export const EmployeeChangePassword = ({ employee_id }: EmployeeChangePasswordProps) => {
  const { onSubmit, isLoading } = useEmployeeChangePassword();

  return (
    <div className="w-full mt-8">
        <Form className="max-w-130 mx-auto" onSubmit={(d) => onSubmit(d, employee_id)} schema={employeeChangePasswordSchema}>
          {({ register, formState }) => (
            <>
              <InputForm
                id={"new_password"}
                name={"new_password"}
                type={"password"}
                inputSize={"size_60"}
                register={register("new_password")}
                error={formState.errors["new_password"]}
                label={"Новый пароль"}
                placeholder={"Новый пароль"}
                required
              />
            
              <InputForm
                id={"confirm_password"}
                name={"confirm_password"}
                type={"password"}
                inputSize={"size_60"}
                register={register("confirm_password")}
                error={formState.errors["confirm_password"]}
                label={"Подтвердите пароль"}
                placeholder={"Подтвердите пароль"}
                required
              />

              <Button size={"size_48"} isLoading={isLoading} disabled={isLoading}>Сохранить</Button>

            </>
          )}
        </Form>
    </div>
  )
}
