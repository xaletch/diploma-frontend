import { useDialog } from "@/entities/dialog"
import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui"

interface DeleteAccountActionProps {
  profile_id: string;
}

export const DeleteAccountAction = ({ profile_id }: DeleteAccountActionProps) => {
  const { openDialog } = useDialog();

  return (
    <Card onClick={() => openDialog("me_delete", { profile_id })} className="cursor-pointer">
      <CardHeader>
        <CardTitle className="text-red">Удалить аккаунт</CardTitle>
        <CardDescription>Навсегда удалите свою учетную запись со всеми данными.</CardDescription>
      </CardHeader>
    </Card>
  )
}
