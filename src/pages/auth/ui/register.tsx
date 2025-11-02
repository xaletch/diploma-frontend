import { Button, Form, Input } from "@/shared/ui"
import { RegisterSchema } from "../model/schemas/register.schema"
import { Link } from "@tanstack/react-router"
import { useRegister } from "../model/hooks/register.hook";

export const Register = () => {
  const { onSubmit, isLoading } = useRegister();
  return (
    <div>
      <Form onSubmit={(data) => onSubmit(data)} schema={RegisterSchema}>
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
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="first_name"
                name="first_name"
                type="text"
                register={register("first_name")}
                error={formState.errors["first_name"]}
                label="Фамилия"
                required
              />
              <Input
                id="last_name"
                name="last_name"
                type="text"
                register={register("last_name")}
                error={formState.errors["last_name"]}
                label="Имя"
                required
              />
            </div>
            <Input
              id="phone"
              name="phone"
              type="tel"
              register={register("phone")}
              error={formState.errors["phone"]}
              label="Номер телефона"
              required
            />
            <div>
              <Button type="submit" isLoading={isLoading}>Зарегистрироваться</Button>
            </div>
          </>
        )}
      </Form>
      <div className="flex items-center justify-center mt-2.5">
        <Link to={"/register"} className="text-sm text-blue-500">Есть аккаунт?</Link>
      </div>
    </div>
  )
}
