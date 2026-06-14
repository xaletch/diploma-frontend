import { Link, useSearch } from "@tanstack/react-router"
import { useCheckInviteTokenMutation } from "../service/auth.service";
import { useEffect } from "react";
import { Loading } from "@/widgets/loading";
import { Button, Form, Input, InputForm } from "@/shared/ui";
import { Controller } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { RegisterSchema } from "../model/schemas/register.schema";
import { cn } from "@/shared/utils";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useInvite } from "../model/hooks/invite.hook";

export const Invite = () => {
  const search = useSearch({ from: "/_auth/_layout/invite" });

  const [check, { isLoading, isError, error }] = useCheckInviteTokenMutation();
  const { onSubmit, isLoading: isSubmitted } = useInvite();

  useEffect(() => {
    check({ token: search.token });
  }, [search.token]);

  if (isLoading) return <Loading />

  /**
    ===== ВРЕМЕННАЯ ЗАГЛУГКА =====
  **/
  const errorData = error as FetchBaseQueryError & {
    data: {
      message: string;
      title: string;
      code: number;
    }
  }

  return (
    <div className="p-5 md:p-8 rounded-3xl md:bg-black/4">
      <div>
        <h1 className="text-center text-2xl font-extrabold leading-7">Регистрация</h1>
      </div>
      {isError && (
        <div className="mt-3 bg-red rounded-2xl p-3 text-sm leading-4 text-error-color-text">
          <p>{errorData.data.message}</p>
        </div>
      )}
      <div className={cn(isError ? "mt-4" : "mt-8")}>
        <Form
          onSubmit={(data) => onSubmit(data, search.token)}
          schema={RegisterSchema}
          options={{ defaultValues: {
            email: search.email ?? "",
            first_name: "",
            last_name: "",
            phone: "",
            password: "",
          } }}
        >
          {({ register, formState, control }) => (
            <>
              <InputForm
                id={"email"}
                name={"email"}
                type={"email"}
                inputSize={"size_60"}
                register={register("email")}
                readOnly
                placeholder={"Email"}
              />
              <div className="grid 380:grid-cols-2 gap-4">
                <InputForm
                  id={"first_name"}
                  name={"first_name"}
                  type={"text"}
                  inputSize={"size_60"}
                  register={register("first_name")}
                  error={formState.errors["first_name"]}
                  placeholder={"Имя"}
                />
                <InputForm
                  id={"last_name"}
                  name={"last_name"}
                  type={"text"}
                  inputSize={"size_60"}
                  register={register("last_name")}
                  error={formState.errors["last_name"]}
                  placeholder={"Фамилия"}
                />
              </div>
              <Controller
                name={"phone"}
                control={control}
                render={({ field, formState }) => (
                  <PatternFormat
                    id={"phone"}
                    name={"phone"}
                    format={"+7 (###) ### ##-##"}
                    mask={"_"}
                    onChange={(v) => field.onChange(v)}
                    value={field.value}
                    customInput={Input}
                    inputSize={"size_60"}
                    error={formState.errors["phone"]}
                    placeholder={"Телефон"}
                  />
                )}
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
                  isLoading={isSubmitted}
                  disabled={isSubmitted}
                >
                  Зарегистрироваться
                </Button>
              </div>
              <div className="flex items-center justify-center">
                <p>Уже есть аккаунт? <Link to={"/login"} className="text-orange hover:text-warn-color-icon underline duration-200 cursor-pointer">Войти</Link></p>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  )
}
