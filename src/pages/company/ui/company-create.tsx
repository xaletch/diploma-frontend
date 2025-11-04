import { Button, Form, Input } from "@/shared/ui"
import { CompanySchema } from "../model/schema/company.schema"

export const CompanyCreate = () => {
  return (
    <div className="max-w-5xl mx-auto w-full py-20">
      <h1 className="text-2xl font-bold mb-6">Создание компании</h1>
      <Form onSubmit={(data) => console.log(data)} schema={CompanySchema}>
        {({ register, formState }) => (
          <div className="flex justify-between">
            <div className="w-full max-w-md">
              <Input
                name="name"
                id="name"
                type="text"
                register={register("name")}
                error={formState.errors["name"]}
                label="Наименование компании"
                required
              />
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
