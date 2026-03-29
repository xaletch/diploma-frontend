import { Button, Card, Form, FormWrapperAction, InputForm, SelectForm } from "@/shared/ui"
import { CardContent, CardContentLabel, CardContentLabelDescription, CardContentLabelTitle, CardHeader, CardTitle } from "@/shared/ui/card/ui/card"
import { useSelector } from "react-redux"
import { useAccount } from "@/entities/account"
import { useInvite } from "../../model/hooks/invite.hook"
import { Avatar } from "@/entities/user"
import { Controller } from "react-hook-form"
import { PatternFormat } from "react-number-format"
import { ROLE } from "@/shared/constants"
import { inviteCheckSchema, employeeSchema } from "../../model/schemas"

export const EmployeeInviteForm = () => {
  const { location } = useSelector(useAccount);

  const { onCheck, onInvite, step, employee, isLoading, error } = useInvite();

  return (
    <div className="mt-8 relative">
      <div className="max-w-140 mx-auto space-y-8 relative">
        <Form id="check" className="space-y-8 relative" onSubmit={(data) => onCheck(data, location!.id)} schema={inviteCheckSchema}>
          {({ register, formState }) => (
            <>
              <Card>
                <CardHeader className="pb-0">
                  <CardTitle>Email</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {error.check && <div className="p-3 rounded-xl bg-red border-2 text-white border-red text-xs">{error.check}</div>}
                  <InputForm
                    name={"email"}
                    id={"email"}
                    type={"email"}
                    inputSize={"size_56"}
                    register={register("email")}
                    label={"Email"}
                    error={formState.errors["email"]}
                    required
                    disabled={step !== "check"}
                    className={"disabled:opacity-90"}
                  />


                  <div className="bg-card/60 px-4 py-4 w-full text-md h-14 rounded-xl flex flex-col justify-center">
                    <span className="text-11 leading-2 font-normal select-none">Локация</span>
                    <p className="font-medium opacity-80 text-md">{location?.name}</p>
                  </div>

                </CardContent>

              </Card>
            </>
          )}
        </Form>

        {step === "invite" && employee !== null && (
          <Card>
              <CardHeader className="flex-row items-center gap-4 bg-card/60 rounded-t-3xl p-6">
                <Avatar size={"lg"} id={employee.id} name={employee.first_name.slice(0, 1)} avatar_url={employee.avatar} />
                <div className="space-y-0.5 flex-1">
                  <CardTitle className="text-xl">{employee.first_name} {employee.last_name}</CardTitle>
                </div>
              </CardHeader>
            <CardContent className="space-y-5">

              <CardContentLabel>
                <CardContentLabelTitle>Номер телефона</CardContentLabelTitle>
                <CardContentLabelDescription>{employee.phone}</CardContentLabelDescription>
              </CardContentLabel>

              <CardContentLabel>
                <CardContentLabelTitle>Email</CardContentLabelTitle>
                <CardContentLabelDescription>{employee.email}</CardContentLabelDescription>
              </CardContentLabel>

              <CardContentLabel>
                <CardContentLabelTitle>Роль</CardContentLabelTitle>
                <CardContentLabelDescription className="capitalize">{ROLE[employee.role.name]}</CardContentLabelDescription>
              </CardContentLabel>

            </CardContent>
          </Card>
        )}

        {step === "create" && (
          <Form id="create" className="space-y-8 relative" onSubmit={(data) => onInvite(data, location?.id ?? "")} schema={employeeSchema}>
            {({ register, formState, control }) => (
              <>
                <Card>
                  <CardHeader className="pb-0">
                    <CardTitle>Основная информация</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <InputForm
                      name={"first_name"}
                      id={"first_name"}
                      type={"text"}
                      inputSize={"size_56"}
                      register={register("first_name")}
                      label={"Имя"}
                      placeholder={"Имя"}
                      error={formState.errors["first_name"]}
                      required
                    />
                    <InputForm
                      name={"last_name"}
                      id={"last_name"}
                      type={"text"}
                      inputSize={"size_56"}
                      register={register("last_name")}
                      label={"Фамилия"}
                      placeholder={"Фамилия"}
                      error={formState.errors["last_name"]}
                    />
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
                          customInput={InputForm}
                          required
                          register={register("phone")}
                          label={"Номер телефона"}
                          inputSize={"size_56"}
                          error={formState.errors["phone"]}
                          placeholder={"Телефон"}
                        />
                      )}
                    />
                    <InputForm
                      name={"position"}
                      id={"position"}
                      type={"text"}
                      inputSize={"size_56"}
                      register={register("position")}
                      label={"Должность"}
                      placeholder={"Должность"}
                      error={formState.errors["position"]}
                      required
                    />
                  </CardContent>

                </Card>

                <Card>
                  <CardHeader className="pb-0">
                    <CardTitle>Уроведь доступа</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SelectForm
                      name={"role"}
                      control={control}
                      options={[{ id: 1, value: "1", label: "Владелец" }, { id: 2, value: "2", label: "Сотрудник" }]}
                      error={formState.errors["role"]}
                      label={"Роль"}
                      placeholder={"Роль"}
                      required
                    />
                  </CardContent>
                </Card>
              </>
            )}
          </Form>
        )}

        <FormWrapperAction>
          {step === "check" && <Button form="check" className="max-w-60" isLoading={isLoading.check} disabled={isLoading.check}>Далее</Button>}
          {step === "invite" && employee !== null && (
            <Button
              className="max-w-60"
              onClick={() => onInvite(
                {
                  ...employee, 
                  birthdate: null,
                  note: null,
                  role: employee.role.id.toString(),
                },
                location!.id,
              )}
              isLoading={isLoading.create}
              disabled={isLoading.create}
              >Добавить</Button>
          )}
          {step === "create" && <Button form="create" className="max-w-60" isLoading={isLoading.create} disabled={isLoading.create}>Создать</Button>}
        </FormWrapperAction>
      </div>
    </div>
  )
}
