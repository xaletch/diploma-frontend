import { Card, Form, InputForm } from "@/shared/ui"
import { CardContent, CardHeader, CardTitle } from "@/shared/ui/card/ui/card"
import { inviteSchema } from "../../model/hooks/invite.schema"
import { useSelector } from "react-redux"
import { useAccount } from "@/entities/account"

export const EmployeeInviteForm = () => {

  const { location } = useSelector(useAccount);

  return (
    <div className="mt-8 relative">
      <Form className="max-w-140 space-y-8 mx-auto" onSubmit={(data) => console.log(data)} schema={inviteSchema}>
        {({ register, formState }) => (
          <>
            <Card>
              <CardHeader className="pb-0">
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <InputForm
                  name={"email"}
                  id={"email"}
                  type={"email"}
                  inputSize={"size_56"}
                  register={register("email")}
                  label={"Email"}
                  error={formState.errors["email"]}
                  required
                />

                <div className="bg-card/60 px-4 py-4 w-full flex text-md h-14 rounded-xl">
                  {location?.name}
                </div>

              </CardContent>

            </Card>
          </>
        )}
      </Form>
    </div>
  )
}
