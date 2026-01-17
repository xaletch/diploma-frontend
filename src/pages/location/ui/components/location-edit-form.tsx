import { mockCountries, mockTimezone } from "@/pages/company/model/mock"
import { Button, Card, Form, FormWrapperAction, InputForm, SelectForm, TextareaForm } from "@/shared/ui"
import { CardContent, CardHeader, CardTitle } from "@/shared/ui/card/ui/card"
import { Input } from "@/shared/ui/input"
import { Controller } from "react-hook-form"
import { PatternFormat } from "react-number-format"
import { locationSchema, type LocationType } from "../../model/schema/location.schema"
import type { ILocationDetail } from "@/entities/location"
import { useEditLocation } from "../../model/hooks/edit-location.hook"

interface LocationEditFormProps {
  location: ILocationDetail;
}

export const LocationEditForm = ({ location }: LocationEditFormProps) => {
  const { onSubmit, isLoading } = useEditLocation();
  const defaultValues = {
    name: location.name,
    description: location.description,
    phone: location.phone,

    country: location.address.country,
    city: location.address.city,
    region: location.address.region,
    street: location.address.street,
    house: location.address.house,
    post_code: location.address.post_code,

    timezone: location.timezone,
    lat: location.address.map.lat,
    lng: location.address.map.lng,
  } satisfies LocationType;

  return (
    <div className="mt-8 relative">
      <Form 
        className="max-w-140 mx-auto space-y-8" 
        onSubmit={(data) => onSubmit(data, location.id)}
        options={{ defaultValues }}
        schema={locationSchema}
      >
        {({ register, formState, control } ) => (
          <>
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
                      label={"Номер телефона"}
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
              >Сохранить
              </Button>
            </FormWrapperAction>
          </>
        )}
      </Form>
    </div>
  )
}
