import { useAccount } from "@/entities/account";
import { AccountDropdown, AsideItem, LocationDropdown } from "@/features/sidebar";
import { useSelector } from "react-redux";
import { SidebarAside } from "./sidebar-aside";
import SvgSetting from "@/shared/icons/Setting";

export const Sidebar = () => {
  const { account, location } = useSelector(useAccount);
  
  return (
    <div className="min-h-screen w-59 duration-200 flex flex-col bg-accent text-white fixed py-6">
      {!account ? (
        <div>ERROR</div>
      ) : (
        <>
          <div className="space-y-7.5 flex-1">
    
            <div className="px-5">
              <h1 className="text-lg leading-5 font-extrabold">{account?.company?.name}</h1>
              <span className="text-xss leading-3 text-white/70">{account.company?.industry.name}</span>
            </div>
    
            {location && <LocationDropdown avatar_url={location.avatar} name={location.name} selectId={location.id} locations={account.locations} />}

            <SidebarAside />
          </div>
    
          <div>

            <div className="flex flex-col gap-2 px-5">
              {/* <AsideItem to="/" name="Помощь" className="hover:bg-transparent! px-0" icon={<SvgHelp width={16} height={16}/>} /> */}
              <AsideItem to="/settings" name="Настройки" className="hover:bg-transparent! px-0" icon={<SvgSetting width={20} height={20}/>} />
            </div>
    
            <AccountDropdown
              id={account.id}
              avatar_url={account.avatar}
              first_name={account.first_name}
              last_name={account.last_name}
              full_name={account.full_name}
              role={account.role}
            />
    
            <div className="px-5">
              <p className="text-10 font-medium text-white/60">© 2025 CRM. Все права защищены.</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
