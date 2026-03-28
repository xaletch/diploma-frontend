import { useDispatch } from "react-redux"
import { dialogClose, dialogOpen } from "../slice/dialog.slice";
import type { DialogData, DialogNames } from "../types/dialog.type";

interface UseDialogReturnProps {
  openDialog: <N extends DialogNames>(name: N, data: DialogData<N>) => void,
  closeDialog: () => void
}

export const useDialog = (): UseDialogReturnProps => {
  const dispatch = useDispatch();

  const openDialog = <N extends DialogNames>(name: N, data: DialogData<N>) => {
    dispatch(dialogOpen({ name: name, data }));
  }

  const closeDialog = () => {
    dispatch(dialogClose());
  }

  return {
    openDialog,
    closeDialog,
  }
};