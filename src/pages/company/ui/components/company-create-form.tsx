import { mockCountries, mockCurrency, mockTimezone } from "@/pages/company/model/mock"
import { CompanySchema, type CompanyType } from "@/pages/company/model/schema/company.schema"
import SvgChevron from "@/shared/icons/Chevron"
import { Button, ErrorForm, Form, ImagePicker, InputForm, SelectForm } from "@/shared/ui"
import { Controller } from "react-hook-form"

export const CompanyCreateForm = ({ setCompany }: { setCompany: (data: CompanyType) => void }) => {
  return (
    <Form onSubmit={(data) => setCompany(data)} schema={CompanySchema}>
      {({ register, formState, control }) => (
        <div className="relative flex gap-8 justify-center">
          <div className="w-full space-y-8 max-w-140">
            <div className="space-y-4">
              <div className="space-y-4">
                <h2 className="text-lg font-extrabold leading-4">Как называется ваша компания?</h2>
                <InputForm
                  name={"name"}
                  id={"name"}
                  type={"text"}
                  inputSize={"size_56"}
                  register={register("name")}
                  error={formState.errors["name"]}
                />
              </div>
            </div>

            {/* АДРЕС */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-extrabold leading-4">Юридический адрес</h2>
                <InputForm
                  name={"address"}
                  id={"address"}
                  type={"text"}
                  inputSize={"size_56"}
                  register={register("address")}
                  error={formState.errors["address"]}
                  label={"Адрес"}
                  required
                />
              </div>
            </div>


            {/* НАСТРОЙКИ */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-extrabold leading-4">Настройки</h2>
                <SelectForm
                  name={"country"}
                  control={control}
                  options={mockCountries}
                  error={formState.errors["country"]}
                  label={"Страна"}
                  required
                />

                <SelectForm
                  name={"timezone"}
                  control={control}
                  options={mockTimezone}
                  error={formState.errors["timezone"]}
                  label={"Часовой пояс"}
                  required
                />

                <SelectForm
                  name={"currency"}
                  control={control}
                  options={mockCurrency}
                  error={formState.errors["currency"]}
                  label={"Валюта"}
                  required
                />

              </div>
            </div>
          </div>

          <Controller
            control={control}
            name={"logo"}
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

          <div className="left-0 right-0 mx-auto fixed bottom-0 flex justify-center md:bg-transparent backdrop-blur-xs bg-black/4 py-6 rounded-t-3xl px-5">
            <Button
              type={"submit"}
              className={"w-full md:max-w-50 font-normal"}
              iconRight={<SvgChevron width={18} height={18}/>}
              disabled={false}
              isLoading={false}
            >
              Далее
            </Button>
          </div>
        </div>
      )}
    </Form>
  )
}
