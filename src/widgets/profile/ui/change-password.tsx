import { changePasswordSchema, useChangePassword } from "@/features/profile";
import { ChevronIcon } from "@/shared/icons"
import { Button, Card, CardContent, CardHeader, CardTitle, Form, InputForm } from "@/shared/ui"
import { cn } from "@/shared/utils";
import { useState } from "react"

export const ChangePassword = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { onSubmit, isLoading } = useChangePassword();

  return (
    <Card className="w-full">
      <CardHeader className={cn("space-y-0 flex flex-row items-center justify-between cursor-pointer", open ? "pb-0" : "")} onClick={() => setOpen(!open)}>
        <CardTitle className="text-2xl">Изменить пароль</CardTitle>
        <div className={cn(open ? "rotate-270" : "rotate-90", "duration-200")}><ChevronIcon width={20} height={20} /></div>
      </CardHeader>
      <CardContent className={cn(open ? "h-fit opacity-100" : "h-0 opacity-0 pt-0 pb-0", "overflow-hidden duration-100")}>

        <Form onSubmit={onSubmit} schema={changePasswordSchema}>
          {({ register, formState }) => (
            <>

              <InputForm
                id={"old_password"}
                name={"old_password"}
                type={"password"}
                inputSize={"size_60"}
                register={register("old_password")}
                error={formState.errors["old_password"]}
                label={"Текущий пароль"}
                placeholder={"Текущий пароль"}
                required
              />

              <InputForm
                id={"password"}
                name={"password"}
                type={"password"}
                inputSize={"size_60"}
                register={register("password")}
                error={formState.errors["password"]}
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

      </CardContent>
    </Card>
  )
}
