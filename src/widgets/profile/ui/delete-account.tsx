import { useDialog } from "@/entities/dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Button } from "@/shared/ui"

interface DeleteMeAccountProps {
  profile_id: string;
}

export const DeleteMeAccount = ({ profile_id }: DeleteMeAccountProps) => {
  const { closeDialog } = useDialog();

  const handleDelete = async () => {
    console.log(profile_id);
    closeDialog();
  }
  
  return (
    <Dialog open onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="leading-7">Вы уверены, что хотите удалить свой аккаунт?</DialogTitle>
          <DialogDescription className="text-xs opacity-50">
            После удаления Вашей учётной записи Вы будете разлогинены и потеряете доступ ко всем данным, включая бронирования и другую информацию.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type={"button"} variant={"red"} onClick={handleDelete}>Удалить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
