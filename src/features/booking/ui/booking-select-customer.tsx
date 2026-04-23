import { setBookingCreate } from "@/entities/booking";
import { useCompanyCustomersQuery } from "@/entities/directories";
import { Avatar } from "@/entities/user";
import { useAppDispatch } from "@/shared/hooks";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select/ui/select-custom";

// interface BookingSelectCustomerProps {}

export const BookingSelectCustomer = () => {

  const { data, isLoading } = useCompanyCustomersQuery();
  const dispatch = useAppDispatch();
  return (
    <Select>
      <SelectTrigger>
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
              handleSelect={() => dispatch(setBookingCreate({ customer }))}
              className="flex items-center gap-2 rounded-none"
            >
              <Avatar size={"small"} id={customer.id} avatar_url={customer.avatar} name={customer.first_name} />
              <div>
                <div className="text-md leading-5">{customer.full_name}</div>
                <div className="text-10 leading-3">{customer.phone}</div>
              </div>
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  )
}
