import { LocationIcon, PaletteIcon, SettingIcon } from "@/shared/icons"
import SvgPerson from "@/shared/icons/Person"
import { Link } from "@tanstack/react-router"

const settings = [
  {
    icon: <SettingIcon />,
    name: "Настройки системы",
    href: "/settings/system",
  },
  {
    icon: <LocationIcon />,
    name: "Локации",
    href: "/business/locations",
  },
  {
    icon: <PaletteIcon />,
    name: "Услуги",
    href: "/business/services",
  },
  {
    icon: <SvgPerson />,
    name: "Профиль",
    href: "/me",
  }
]

export const SettingsContent = () => {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-4 gap-5">


        {settings.map((item, idx) => (
          <Link to={item.href} key={idx} className="bg-card rounded-2xl px-10 py-12">
            <div className="flex items-center flex-col gap-2.5">
              <div className="size-8">{item.icon}</div>
              <p className="text-base">{item.name}</p>
            </div>
          </Link>
        ))}

      </div>
    </div>
  )
}
