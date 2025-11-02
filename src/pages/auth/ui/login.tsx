import { Button, Form, Input } from "@/shared/ui"
import { LoginSchema } from "../model/schemas/login.schema"
import { useLogin } from "../model/hooks/login.hook";
import { Link } from "@tanstack/react-router";

export const Login = () => {
  const { onSubmit, isLoading } = useLogin();

  return (
    <div>
      <Form onSubmit={(data) => onSubmit(data)} schema={LoginSchema}>
        {({ register, formState }) => (
          <>
            <Input
              id="email"
              name="email"
              type="email"
              register={register("email")}
              error={formState.errors["email"]}
              label="Email"
              required
            />
            <Input
              id="password"
              name="password"
              type="password"
              register={register("password")}
              error={formState.errors["password"]}
              label="Пароль"
              required
            />
            <div>
              <Button type="submit" isLoading={isLoading}>Войти</Button>
            </div>
          </>
        )}
      </Form>
      <div className="flex items-center justify-center mt-2.5">
        <Link to={"/register"} className="text-sm text-blue-500">Нет аккаунта?</Link>
      </div>
    </div>
  )
}
