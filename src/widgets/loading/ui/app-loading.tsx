import { Spinner } from "@/shared/ui"

export const AppLoading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex items-center flex-col">
        <Spinner className="size-10 text-primary" />
        <p className="mt-5 font-medium text-base opacity-80">
          Загрузка системы<span className="inline-block"></span>
        </p>
      </div>
    </div>
  )
}
