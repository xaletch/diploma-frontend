import { Button, Form, Input } from "@/shared/ui"
import { CompanySchema } from "../model/schema/company.schema"
import { useCompanyCreate } from "../model/hook/company-create.hook";

export const CompanyCreate = () => {
  const { stepOne } = useCompanyCreate();

  return (
    <div className="max-w-5xl mx-auto w-full py-20 px-10">
      <h1 className="text-2xl font-bold mb-6">Создание компании</h1>
      <Form onSubmit={(data) => stepOne(data)} schema={CompanySchema}>
        {({ register, formState }) => (
          <div className="flex justify-between">
            <div className="w-full max-w-md flex flex-col gap-4">
              <Input
                name="name"
                id="name"
                type="text"
                register={register("name")}
                error={formState.errors["name"]}
                label="Наименование компании"
                required
              />
              <div className="mt-5">
                <h2 className="text-xl font-bold">Локация</h2>
                <div className="flex flex-col gap-4 mt-5">
                  <Input
                    name="country"
                    id="country"
                    type="text"
                    register={register("country")}
                    error={formState.errors["country"]}
                    label="Страна"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="city"
                      id="city"
                      type="text"
                      register={register("city")}
                      error={formState.errors["city"]}
                      label="Город"
                      required
                    />
                    <Input
                      name="region"
                      id="region"
                      type="text"
                      register={register("region")}
                      error={formState.errors["region"]}
                      label="Регион"
                      required
                    />
                    <Input
                      name="street"
                      id="street"
                      type="text"
                      register={register("street")}
                      error={formState.errors["street"]}
                      label="Улица"
                    />
                    <Input
                      name="house"
                      id="house"
                      type="text"
                      register={register("house")}
                      error={formState.errors["house"]}
                      label="Дом"
                    />
                  </div>
                  <Input
                    name="post_code"
                    id="post_code"
                    type="text"
                    register={register("post_code")}
                    error={formState.errors["post_code"]}
                    label="Почтовый индекс"
                  />
                </div>
              </div>
              <div className="mt-5">
                <h2 className="text-xl font-bold">Настройки</h2>
                <div className="flex flex-col gap-4 mt-5">
                  <Input
                    name="currency"
                    id="currency"
                    type="text"
                    register={register("currency")}
                    error={formState.errors["currency"]}
                    label="Валюта компании"
                    required
                  />
                  <Input
                    name="timezone"
                    id="timezone"
                    type="text"
                    register={register("timezone")}
                    error={formState.errors["timezone"]}
                    label="Часовой пояс"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="w-full max-w-80 py-6">
              <Button type="submit" isLoading={false}>Создать</Button>
            </div>
          </div>
        )}
      </Form>
    </div>
  )
}
