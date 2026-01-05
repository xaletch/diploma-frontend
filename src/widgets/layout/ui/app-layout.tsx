import { AppLoading } from "@/widgets/loading"
import type { PropsWithChildren } from "react"
import { useInitialize } from "../model/hooks/initialize.hook";
import { useSelector } from "react-redux";
import { useAccount } from "@/entities/account";
import { Sidebar } from "@/widgets/sidebar";

export const AppLayout = ({ children }: PropsWithChildren) => {
  const { isInitialized } = useInitialize();
  const { isCompany } = useSelector(useAccount);

  return (
    <div className="flex flex-1 min-h-full relative">
      {!isInitialized ? (
        <AppLoading />
      ) : (
        <>
          {isCompany && <Sidebar />}

          <main className="flex flex-col flex-1 pl-59">
            <div className="p-8 grid flex-1">
              {children}
            </div>
          </main>
        </>
      )}
    </div>
  )
}
