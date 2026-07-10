import { useDialog } from "@/entities/dialog";
import { useCreateMutation, useUpdateMutation, type IScheduleCreateBodyCredentials, type IScheduleIntervals } from "@/entities/schedule";
import type { DayInfo } from "@/features/calendar";
import { intervalsSchema, type IntervalsSchemaType } from "@/features/schedule/model/schemas/schedule.schema";
import { IntervalsField } from "@/features/schedule/ui/intervals-field";
import { Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, Form } from "@/shared/ui"
import { getErrorMessage } from "@/shared/utils";
import { toast } from "sonner";

interface ScheduleDialogProps {
  location_id: string;
  data: {
    schedule_id: number | null;
    schedule: {
      date_key: string;
      year: number;
      month_index: number;
      day: number;
      backend_date: string,
    };
    user_id: string;
    intervals: IScheduleIntervals[];
    day_info?: DayInfo;
  };
}

export const ScheduleDialog = ({ location_id, data: props }: ScheduleDialogProps) => {
  const { closeDialog } = useDialog();

  const [createSchedule, { isLoading: isCreating }] = useCreateMutation()
  const [updateSchedule, { isLoading: isUpdating }] = useUpdateMutation()

  const onSubmit = async (data: IntervalsSchemaType): Promise<void> => {
    try {
      const payloadBody = {
        date: props.schedule.date_key,
        intervals: data.intervals,
        user_id: props.user_id,
      } satisfies IScheduleCreateBodyCredentials;
      console.log(data, props);
      if (props.schedule_id != null) {
        await updateSchedule({
          params: { location_id, schedule_id: props.schedule_id },
          body: payloadBody,
        }).unwrap()
        closeDialog();
      } else {
        await createSchedule({
          params: { location_id },
          body: payloadBody,
        }).unwrap()
        closeDialog();
      }
    }
    catch (error) {
      console.error("Не удалось сохранить расписание");
      toast.error(getErrorMessage(error));
    }
  }
  
  return (
    <Dialog open onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Настройка расписания</DialogTitle>
        </DialogHeader>

        <div>

          <Form
            id={"schedule-save"}
            onSubmit={(data) => onSubmit(data)}
            schema={intervalsSchema}
            options={{ defaultValues: { intervals: props.day_info?.intervals ?? [ { start: "", end: "" } ] } }}
          >
            {({ control, formState }) => <IntervalsField control={control} formState={formState} isLoading={isCreating || isUpdating} />}
          </Form>
        </div>
        
        <DialogFooter>
          <DialogClose>Отменить</DialogClose>
          <Button
            form={"schedule-save"}
            variant={"dialog_apply"}
            isLoading={isCreating || isUpdating}
            disabled={isCreating || isUpdating}
          >Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
