import { Button } from "@/shared/ui"
import { ChevronRightIcon } from "lucide-react"

interface CurrentDateProps {
  calendarTitle: string;
  goPrevMonth: () => void;
  goNextMonth: () => void;
}

export const CurrentDate = ({ calendarTitle, goPrevMonth, goNextMonth }: CurrentDateProps) => {
  return (
    <div className="flex items-center gap-3">
      <Button variant={"secondary"} size={"icon_40"} onClick={goPrevMonth} aria-label={"Предыдущий месяц"}>
        <ChevronRightIcon className="rotate-180" width={20} height={20} />
      </Button>

      <div className="flex flex-col">
        <p className="text-lg font-extrabold leading-6">{calendarTitle}</p>
      </div>

      <Button variant={"secondary"} size={"icon_40"} onClick={goNextMonth} aria-label={"Следующий месяц"}>
        <ChevronRightIcon width={20} height={20} />
      </Button>
    </div>
  )
}
