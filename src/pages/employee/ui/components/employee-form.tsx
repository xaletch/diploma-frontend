import { Button, Card, CardContent, CardHeader, CardTitle, Form, FormWrapperAction, InputForm, SelectForm, TextareaForm } from "@/shared/ui"
import { Controller } from "react-hook-form"
import { PatternFormat } from "react-number-format"
import { employeeSchema, type EmployeeSchemaType } from "../../model/schemas"
import type { IEmployeeDetail } from "@/entities/employee";

type EmployeeForm = {
  isEdit: true;
  data: IEmployeeDetail;
  onSubmit: (data: EmployeeSchemaType) => Promise<void>;
  formId?: string;
  isLoading: boolean;
} | {
  isEdit: false;
  data?: never;
  onSubmit: (data: EmployeeSchemaType) => Promise<void>;
  formId: string;
  isLoading: never;
}

export const EmployeeForm = ({ data, formId, onSubmit, isLoading, isEdit }: EmployeeForm) => {
  return (
    <Form
      id={formId}
      className={"space-y-8 relative"}
      onSubmit={onSubmit}
      schema={employeeSchema}
      options={{
        defaultValues: {
          first_name: data?.profile.first_name ?? "",
          last_name: data?.profile.last_name ?? "",
          phone: data?.profile.phone ?? "",
          position: data?.profile.position ?? "",
          role: data?.profile.role.id.toString() ?? "",
          birthdate: data?.profile.birthday ?? "",
          note: data?.note ?? "",
        }
      }}
    >
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

          {isEdit && (
            <Card>
              <CardHeader className="pb-0">
                <CardTitle>Дополнительная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <InputForm
                  name={"birthdate"}
                  id={"birthdate"}
                  type={"text"}
                  inputSize={"size_56"}
                  register={register("birthdate")}
                  label={"Дата рождения"}
                  placeholder={"Дата рождения"}
                  error={formState.errors["birthdate"]}
                />
                <TextareaForm
                  name={"note"}
                  id={"note"}
                  register={register("note")}
                  label={"Заметка"}
                  placeholder={"Заметка"}
                  error={formState.errors["note"]}
                />
              </CardContent>
            </Card>
          )}

          {!formId && (
            <FormWrapperAction>
              <Button
                type={"submit"}
                className={"w-full md:max-w-50 font-bold"}
                animation={"toggle_sm"}
                disabled={isLoading}
                isLoading={isLoading}
              >Сохранить
              </Button>
            </FormWrapperAction>
          )}
        </>
      )}
    </Form>
  )
}
