import { intervalsSchema } from "@/features/schedule/model/schemas/schedule.schema";
import { IntervalsField } from "@/features/schedule/ui/intervals-field";
import { ChevronIcon } from "@/shared/icons";
import { Button, Form, Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui"
import { Checkbox } from "@/shared/ui/checkbox";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/shared/ui/select/ui/select-custom";

// type ScheduleRegularType = {
//   type: string;
//   start_time: string;
//   end_time: string;
// }

// interface IScheduleRegularCredentials {
//   range_start: string;
//   range_end: string;
//   schedule: ScheduleRegularType[];
// }

export const ScheduleSetting = () => {

  const handleSave = () => {
    // data: IScheduleRegularCredentials
    // console.log(data);
  }

  return (
    <Sheet>
      <SheetTrigger size={"size_44"} className="px-5 text-sm font-bold">Настроить расписание</SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Настройка расписания</SheetTitle>
        </SheetHeader>

        <div className="px-6">

          <div className="flex flex-col gap-5 py-5 border-b border-border">

            <div className="space-y-1">
              <p className="text-primary">От</p>
              <Button
                variant={"transparent"}
                className={"p-0 w-fit h-fit font-semibold"}
                iconRight={<ChevronIcon width={14} height={14} className="rotate-90" />}
              >Июня 2026</Button>
            </div>

            <div className="space-y-1">
              <p className="text-primary">До</p>
              <Button
                variant={"transparent"}
                className={"p-0 w-fit h-fit font-semibold"}
                iconRight={<ChevronIcon width={14} height={14} className="rotate-90" />}
              >Июня 2026</Button>
            </div>

          </div>

          <div className="py-6 grid grid-cols-1 items-start gap-6">

            <div className="grid grid-cols-1 items-start gap-5">
              
              <div className="flex items-center gap-2.5 cursor-pointer w-fit">
                
                <Checkbox id="schedule-mon" className="border-primary border rounded-12! size-7.5" />
                <label htmlFor="schedule-mon" className="cursor-pointer">
                  <span className="text-lg font-bold">Понедельник</span>
                </label>

              </div>

              <div>
                <Select>
                  <SelectTrigger>
                    <SelectValue></SelectValue>
                  </SelectTrigger>
                  <SelectContent></SelectContent>
                </Select>
              </div>


            </div>

            <div className="space-y-2.5">
              <p className="text-lg font-bold">Вторник</p>

              <Form
                onSubmit={(data) => console.log(data)}
                schema={intervalsSchema}
                options={{ defaultValues: { intervals: [ { start: "", end: "" } ] } }}
              >
                {({ control, formState }) => <IntervalsField control={control} formState={formState} isLoading={false} />}
              </Form>
            </div>


          </div>

        </div>

        <SheetFooter className="gap-3 border-t border-border">
          <SheetDescription className="text-xs leading-4 text-orange">Обратите внимание: эти настройки перезапишут существующее расписание</SheetDescription>
          <Button className="font-semibold" onClick={handleSave}>Сохранить</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
