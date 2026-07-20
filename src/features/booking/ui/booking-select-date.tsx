import { setBookingDate } from '@/entities/booking';
import { useAppDispatch } from '@/shared/hooks';
import { CalendarIcon } from '@/shared/icons';
import { Calendar, Card, CardContent } from '@/shared/ui';
import { formatDateWeek } from '@/shared/utils';
import { ru } from 'date-fns/locale';
import { useEffect, useRef, useState } from 'react'

interface BookingSelectDateProps {
  date: string;
}

export const BookingSelectDate = ({ date }: BookingSelectDateProps) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date>(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(selected: Date | undefined) {
    if (!selected) return;
    const formatted = [
      selected.getFullYear(),
      String(selected.getMonth() + 1).padStart(2, "0"),
      String(selected.getDate()).padStart(2, "0"),
    ].join("-");
    dispatch(setBookingDate(formatted));
    setOpen(false);
  }

  return (
    <div className='relative w-full' ref={containerRef}>
      <Card className="relative cursor-pointer select-none" onClick={() => setOpen((prev) => !prev)}>
        <CardContent>
          <div className="text-center font-semibold text-lg">
            {/* {!booking_create?.date ? (
              "- - - - -"
            ) : (
              formatDateWeek()
            )} */}
            {formatDateWeek(date)}
            
            {/* Вт, 25 Апреля 2026г. 10:13 */}
          </div>
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-card-accent border-4 border-card-ring w-11 h-11 flex items-center justify-center rounded-full">
            <CalendarIcon width={22} height={22}/>
          </div>
        </CardContent>
      </Card>

      {open && (
        <div
          className="absolute top-full w-full left-1/2 -translate-x-1/2 mt-2 z-50 shadow-lg rounded-xl bg-popover border border-border"
          onClick={(e) => e.stopPropagation()}
        >
          <Calendar
            mode={"single"}
            selected={new Date(date)}
            onSelect={handleSelect}
            onMonthChange={setMonth}
            month={month}
            locale={ru}
            captionLayout={"dropdown-years"}
          />
        </div>
      )}
    </div>
  )
}
