import { Button, Form, InputForm } from "@/shared/ui"
import { LoginSchema } from "../model/schemas/login.schema"
import { useLogin } from "../model/hooks/login.hook";

export const Login = () => {
  const { onSubmit, isLoading } = useLogin();

  return (
    <div className="p-5 md:p-8 rounded-3xl md:bg-black/4">
      <div>
        <h1 className="text-center text-2xl font-extrabold leading-7">Войти в аккаунт</h1>
      </div>
      <div className="mt-8">
        <Form onSubmit={(data) => onSubmit(data)} schema={LoginSchema}>
          {({ register, formState }) => (
            <>
              <InputForm
                id={"email"}
                name={"email"}
                type={"email"}
                inputSize={"size_60"}
                register={register("email")}
                error={formState.errors["email"]}
                placeholder={"Email"}
              />
              <InputForm
                id={"password"}
                name={"password"}
                type={"password"}
                inputSize={"size_60"}
                register={register("password")}
                error={formState.errors["password"]}
                placeholder={"Пароль"}
              />
              <div>
                <Button 
                  type={"submit"}
                  size={"size_60"}
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Войти
                </Button>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  )
}
