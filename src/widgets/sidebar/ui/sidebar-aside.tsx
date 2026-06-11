import type { PermissionName } from "@/entities/account"
import { usePermissions } from "@/features/auth/model/hooks/permission.hook"
import { AsideItem } from "@/features/sidebar"
import { PaletteIcon } from "@/shared/icons"
import SvgBook from "@/shared/icons/Book"
import SvgCalendar from "@/shared/icons/Calendar"
import SvgCustomer from "@/shared/icons/Customer"
import SvgDashboard from "@/shared/icons/Dashboard"
import SvgNotification from "@/shared/icons/Notification"
import SvgUsersGroup from "@/shared/icons/UsersGroup"
import { useLocation } from "@tanstack/react-router"
import { isRouteActive } from "../model/utils/navigation.util"

interface MenuItem {
  to: string;
  label: string;
  permission?: PermissionName | PermissionName[] | string[];
  icon: React.ReactNode;
  search?: Record<string, unknown>;
}

const menuItems: MenuItem[] = [
  {
    to: "/",
    label: "Дашбоард",
    icon: <SvgDashboard width={20} height={20}/>,
  },
  {
    to: "/bookings",
    label: "Записи",
    search: { limit: 20, sort: "newest" },
    icon: <SvgBook width={20} height={20}/>,
    permission: ["booking:*"],
  },
  {
    to: "/schedule",
    label: "Расписание",
    icon: <SvgCalendar width={20} height={20}/>,
    permission: ["schedule:*"],
  },
  {
    to: "/customers",
    label: "Клиенты",
    search: { limit: 20 },
    icon: <SvgCustomer width={20} height={20}/>,
    permission: ["company-customers:*"],
  },
  {
    to: "/employees/users",
    label: "Сотрудники",
    search: { limit: 20 },
    icon: <SvgUsersGroup width={20} height={20}/>,
    permission: ["employee:*", "employees:read"],
  },
  {
    to: "/business/services",
    label: "Услуги",
    search: { limit: 20 },
    icon: <PaletteIcon width={20} height={20}/>,
    permission: ["service:*"],
  },
  {
    to: "/notifications",
    label: "Уведомления",
    icon: <SvgNotification width={20} height={20}/>,
    permission: [],
  },
];

export const SidebarAside = () => {
  const { pathname } = useLocation();
  const { hasWildcard } = usePermissions();

  return (
    <aside className="px-5">

      <div className="flex flex-col gap-2">
        {menuItems.map((item, idx) => {
          if (item.permission) {
            if (Array.isArray(item.permission)) {
              const access = item.permission.some(p => hasWildcard(p));
              if (!access) return null;
            } else {
              if (!hasWildcard(item.permission)) {
                return null;
              }
            }
          }

          return (
            <AsideItem
              key={idx}
              to={item.to}
              name={item.label}
              selected={isRouteActive(pathname, item.to)}
              icon={item.icon}
              search={item.search}
            />
          )
        })}
      </div>

    </aside>
  )
}
