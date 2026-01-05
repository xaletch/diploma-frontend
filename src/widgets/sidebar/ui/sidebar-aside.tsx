import { AsideItem } from "@/features/sidebar"
import SvgCalendar from "@/shared/icons/Calendar"
import SvgCustomer from "@/shared/icons/Customer"
import SvgDashboard from "@/shared/icons/Dashboard"
import SvgEmployee from "@/shared/icons/Employee"
import SvgNotification from "@/shared/icons/Notification"
import { useLocation } from "@tanstack/react-router"

export const SidebarAside = () => {
  const { pathname } = useLocation();

  return (
    <aside className="px-5">

      <div className="flex flex-col gap-2">
        <AsideItem to="/" name="Дашбоард" selected={pathname === "/"} icon={<SvgDashboard width={20} height={20}/>} />
        <AsideItem to="/schedule" name="Расписание" selected={pathname === "/schedule"} icon={<SvgCalendar width={20} height={20}/>} />
        <AsideItem to="/customers" name="Клиенты" selected={pathname === "/customers"} icon={<SvgCustomer width={20} height={20}/>} />
        <AsideItem to="/employees" name="Сотрудники" selected={pathname === "/employees"} icon={<SvgEmployee width={20} height={20}/>} />
        <AsideItem to="/notifications" name="Уведомления" selected={pathname === "/notifications"} icon={<SvgNotification width={20} height={20}/>} />
      </div>

    </aside>
  )
}
