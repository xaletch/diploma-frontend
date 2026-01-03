import { AppLoading } from "@/widgets/loading"
import type { PropsWithChildren } from "react"
import { useInitialize } from "../model/hooks/initialize.hook";
import { useSelector } from "react-redux";
import { useAccount } from "@/entities/account";

export const AppLayout = ({ children }: PropsWithChildren) => {
  const { isInitialized } = useInitialize();
  const { isCompany, account } = useSelector(useAccount);

  return (
    <div className="flex flex-1 min-h-full">
      {!isInitialized ? (
        <AppLoading />
      ) : (
        <>
          {isCompany && <div className="px-30">
            sidebar
            <p>{account?.name}</p>
          </div>}

          <div className="flex flex-col flex-1">
            <header></header>

            <main className="flex flex-col flex-1">
              {children}
            </main>

          </div>
        </>
      )}
    </div>
  )
}
