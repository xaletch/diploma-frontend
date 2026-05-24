import { mockCountries, mockTimezone } from "@/pages/company/model/mock"
import { Button, Card, ErrorForm, Form, FormWrapperAction, ImagePicker, InputForm, SelectForm, TextareaForm } from "@/shared/ui"
import { CardContent, CardHeader, CardTitle } from "@/shared/ui/card/ui/card"
import { Input } from "@/shared/ui/input"
import { Controller } from "react-hook-form"
import { PatternFormat } from "react-number-format"
import { locationSchema } from "../../model/schema/location.schema"
import { useCreateLocation } from "../../model/hooks/create-location.hook"

export const LocationCreateForm = () => {
  const { onSubmit, isLoading } = useCreateLocation();
  return (
    <div className="mt-8 relative">
      
      <Form className="space-y-8 flex justify-center items-start gap-8" onSubmit={(data) => onSubmit(data)} schema={locationSchema}>
        {({ register, formState, control } ) => (
          <>
            <div className="space-y-8 max-w-140 w-full">
              <Card>
                <CardContent className="space-y-5">
                  <InputForm
                    name={"name"}
                    id={"name"}
                    type={"text"}
                    inputSize={"size_56"}
                    register={register("name")}
                    label={"Название"}
                    error={formState.errors["name"]}
                    placeholder={"Название"}
                    required
                  />
                  <TextareaForm
                    name={"description"}
                    id={"description"}
                    register={register("description")}
                    error={formState.errors["description"]}
                    placeholder={"Описание"}
                    label={"Описание"}
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
                        customInput={Input}
                        inputSize={"size_56"}
                        error={formState.errors["phone"]}
                        placeholder={"Номер телефона"}
                        label={"Телефон"}
                        lcls={"text-xs"}
                        required
                      />
                    )}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3.5">
                  <CardTitle className="text-xl">Часовой пояс <span className="text-red">*</span></CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <SelectForm
                    name={"timezone"}
                    control={control}
                    options={mockTimezone}
                    error={formState.errors["timezone"]}
                  />
                </CardContent>
              </Card>

              {/* ДОБАВИТЬ ЯНДЕКС КАРТУ */}
              <Card>
                <CardHeader className="pb-3.5">
                  <CardTitle className="text-xl">Адрес <span className="text-red">*</span></CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-5">
                  <InputForm
                    name={"city"}
                    id={"city"}
                    type={"text"}
                    inputSize={"size_56"}
                    register={register("city")}
                    error={formState.errors["city"]}
                    placeholder="Ваш адрес"
                  />
                  <SelectForm
                    name={"country"}
                    control={control}
                    options={mockCountries}
                    error={formState.errors["country"]}
                    label={"Страна"}
                    placeholder={"Страна"}
                    required
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
                  // iconLeft={<ArrowCircleIcon width={20} height={20} />}
                >Сохранить
                </Button>
              </FormWrapperAction>
            </div>

            <Controller
              control={control}
              name={"avatar"}
              render={({ field, fieldState }) => (
                <div className="sticky top-4 self-start h-fit">
                  <ImagePicker
                    value={field.value}
                    onChange={field.onChange}
                  />
                  {fieldState.error && <ErrorForm msg={fieldState.error.message} />}
                </div>
              )}
            />
          </>
        )}
      </Form>
    </div>
  )
}
