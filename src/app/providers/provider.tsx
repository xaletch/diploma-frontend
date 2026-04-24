import type { PropsWithChildren } from "react"
import { ReduxProvider } from "./redux"
import { Sonner } from "@/shared/ui"
import { GlobalSelectProvider } from "@/shared/ui/select/ui/select-custom"

export const Provider = ({ children }: PropsWithChildren) => {
  return (
    <ReduxProvider>
      <GlobalSelectProvider>
        {children}
        <Sonner />
      </GlobalSelectProvider>
    </ReduxProvider>
  )
}
