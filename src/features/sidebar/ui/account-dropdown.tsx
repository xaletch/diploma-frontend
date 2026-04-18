import type { IRole } from '@/entities/account';
import { Avatar, UserRole } from '@/entities/user'
import SvgExit from '@/shared/icons/Exit'
import SvgPerson from '@/shared/icons/Person'
import { Button, HoverDropdown, HoverDropdownContent, HoverDropdownItemLink, HoverDropdownSeparator, HoverDropdownTrigger } from '@/shared/ui'

interface AccountDropdownProps {
  id: string;
  avatar_url: string | null;
  first_name: string;
  last_name: string;
  full_name: string;
  role: IRole;
}

export const AccountDropdown = ({ id, avatar_url, first_name, last_name, full_name, role }: AccountDropdownProps) => {
  return (
    <HoverDropdown className={"px-5 py-3"}>
      <HoverDropdownTrigger>
        <Button variant={"dropdown"} size={"none"} className='w-full whitespace-normal'>
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Avatar id={id} avatar_url={avatar_url} name={`${first_name.slice(0, 1)}${last_name.slice(0, 1)}`} opacity={35} />
            <div className="flex flex-col flex-1 min-w-0">
              <p className="text-start text-sm font-semibold leading-3 capitalize line-clamp-2 break-all">{full_name}</p>
              <UserRole role={role}/>
            </div>
          </div>
        </Button>
      </HoverDropdownTrigger>
      <HoverDropdownContent align={"end"} side={"bottom_right"}>
        <HoverDropdownItemLink href={"#"}>
          <SvgPerson width={20} height={20}/>
          <span>Мой профиль</span>
        </HoverDropdownItemLink>
        <HoverDropdownSeparator />
        <HoverDropdownItemLink href={""} className={"text-red hover:text-red"}>
          <SvgExit width={20} height={20}/>
          <span>Выйти</span>
        </HoverDropdownItemLink>
      </HoverDropdownContent>
    </HoverDropdown>
  )
}
