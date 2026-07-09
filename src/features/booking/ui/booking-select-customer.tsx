import { setBookingCreate } from "@/entities/booking";
import { useCompanyCustomersQuery, type IDirectoryCustomer } from "@/entities/directories";
import { Avatar } from "@/entities/user";
import { useAppDispatch } from "@/shared/hooks";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select/ui/select-custom";

interface BookingSelectCustomerProps {
  customer: IDirectoryCustomer | undefined;
}

export const BookingSelectCustomer = ({ customer }: BookingSelectCustomerProps) => {

  const { data, isLoading } = useCompanyCustomersQuery();
  const dispatch = useAppDispatch();

  return (
    <Select value={{
      value: customer?.full_name ?? "",
      label: customer?.full_name ?? "",
      avatar: customer ? { id: customer.id, name: customer.first_name, avatar_url: customer.avatar } : undefined,
    }}>
      <SelectTrigger className="h-16">
        <SelectValue placeholder="Клиент не выбран" />
      </SelectTrigger>
      <SelectContent className="p-0">
        {isLoading ? (
          <div className="p-4 text-center text-sm opacity-60">Загрузка...</div>
        ) : (
          data && data.map((customer, idx) => (
            <SelectItem
              key={idx}
              value={{
                value: customer.first_name,
                label: customer.first_name,
                avatar: { id: customer.id, name: customer.first_name, avatar_url: customer.avatar }
              }}
              onChange={() => dispatch(setBookingCreate({ customer }))}
              className="flex items-center gap-2 rounded-none"
            >
              <Avatar size={"small"} id={customer.id} avatar_url={customer.avatar} name={customer.full_name} />
              <div>
                <div className="text-xs leading-5 font-medium">{customer.full_name}</div>
                <div className="text-11 leading-3">{customer.phone}</div>
              </div>
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  )
}
