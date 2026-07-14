import type { ICustomer } from "@/entities/customers";
import { Button, Card, CardContent, CardHeader, CardTitle, Form, FormWrapperAction, InputForm, TextareaForm } from "@/shared/ui"
import { customerSchema, type customerSchemaType } from "../../model/schemas/customer.schema";
import { Controller } from "react-hook-form";
import { PatternFormat } from "react-number-format";

interface CustomerFormProps {
  data?: ICustomer;
  onSubmit: (data: customerSchemaType) => Promise<void>;
  isLoading: boolean;
}

export const CustomerForm = ({ data, onSubmit, isLoading }: CustomerFormProps) => {
  return (
    <div className="mt-8 relative">
      <div className="max-w-140 mx-auto space-y-8 relative">
        <Form
          className="space-y-8 relative"
          onSubmit={onSubmit}
          schema={customerSchema}
          options={{
            defaultValues: {
              first_name: data?.profile.first_name ?? "",
              last_name: data?.profile.last_name ?? "",
              phone: data?.profile.phone ?? "",
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-0">
                  <CardTitle>Контактная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-0">
                  <CardTitle>Дополнительная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <TextareaForm
                    name={"note"}
                    id={"note"}
                    register={register("note")}
                    label={"Описание"}
                    placeholder={"Описание (видно только вам)"}
                    error={formState.errors["note"]}
                  />
                </CardContent>
              </Card>

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
            </>
          )}
        </Form>
      </div>
    </div>
  )
}
