import { ChartIcon } from "@/shared/icons";

export const ChartEmpty = () => (
  <div className="aspect-auto h-45 w-full flex flex-col items-center justify-center gap-2 text-accent/40">
    <ChartIcon className="size-12" />
    <p className="text-sm">Нет данных за выбранный период</p>
  </div>
);