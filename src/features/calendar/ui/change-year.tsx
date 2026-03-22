import { ChevronRightIcon } from "@/shared/icons"
import { Button } from "@/shared/ui"
import { cn } from "@/shared/utils"
import { useEffect, useRef, useState } from "react";
import { MONTHS } from "../model/constants/calendar.constant";
import { toDateKey } from "../model/utils/calendar.util";

interface ChangeYearProps {
  goPrevYear: () => void;
  goNextYear: () => void;
  handleSelectDate: (dateKey: string | null) => void;
  handleViewMonthIndex: (idx: number) => void;

  calendarTitle: string;
  viewYear: number;
  yearMin: number;
  yearMax: number;
  viewMonthIndex: number;
}

export const ChangeYear = ({ goNextYear, goPrevYear, handleSelectDate, handleViewMonthIndex, calendarTitle, viewYear, yearMin, yearMax, viewMonthIndex }: ChangeYearProps) => {
  const [isMonthYearOpen, setIsMonthYearOpen] = useState(false);
  const monthYearDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isMonthYearOpen) return;

    const onClick = (e: MouseEvent) => {
      const el = monthYearDropdownRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) setIsMonthYearOpen(false);
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMonthYearOpen(false);
    }

    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKeyDown);
    }
  }, [isMonthYearOpen]);

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <div ref={monthYearDropdownRef} className="relative">
        <Button
          variant={"secondary"}
          size={"default"}
          onClick={() => setIsMonthYearOpen((v) => !v)}
          aria-label={"Выбор месяца и года"}
          className="flex items-center gap-3"
        >
          {calendarTitle}
        </Button>

        {isMonthYearOpen && (
          <div
            className="absolute right-0 top-full mt-3 z-20 w-90 rounded-2xl border border-border/50 bg-card/70 backdrop-blur-xl overflow-hidden"
            role="dialog"
            aria-label="Календарь выбор месяца и года"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
              <span className="font-extrabold">{viewYear}</span>
              <div className="flex items-center gap-2">
                <Button
                  variant={"secondary"}
                  size={"icon_40"}
                  onClick={goPrevYear}
                  disabled={viewYear <= yearMin}
                  aria-label="Предыдущий год"
                >
                  <ChevronRightIcon className="rotate-180" width={20} height={20} />
                </Button>
                <Button
                  variant={"secondary"}
                  size={"icon_40"}
                  onClick={goNextYear}
                  disabled={viewYear >= yearMax}
                  aria-label="Следующий год"
                >
                  <ChevronRightIcon width={20} height={20} />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3">
              {MONTHS.map((monthLabel, idx) => {
                const isSelected = idx === viewMonthIndex
                const dateForKey = toDateKey(viewYear, idx, 1)

                return (
                  <button
                    key={`${viewYear}-${idx}`}
                    type="button"
                    onClick={() => {
                      handleSelectDate(null);
                      handleViewMonthIndex(idx);
                      setIsMonthYearOpen(false);
                    }}
                    className={cn("text-center text-sm font-semibold p-2")}
                    aria-label={`${monthLabel} ${viewYear}`}
                    data-date-key={dateForKey}
                  >
                    <span className={cn("text-center text-sm font-semibold px-2.5 py-1 rounded-xl", isSelected ? "font-extrabold bg-white" : "")}>{monthLabel}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
