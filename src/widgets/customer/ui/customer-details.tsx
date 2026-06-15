import { setBookingCreate } from "@/entities/booking";
import type { ICustomer } from "@/entities/customers";
import { Avatar } from "@/entities/user";
import { Copyable } from "@/features/copyable";
import { useAppDispatch } from "@/shared/hooks";
import { AddFillIcon } from "@/shared/icons";
import { Button, Card } from "@/shared/ui";
import { CardContent, CardContentLabel, CardContentLabelDescription, CardContentLabelTitle, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card/ui/card";
import { Link, useNavigate } from "@tanstack/react-router";

interface CustomerDetailsProps {
  customer: ICustomer;
}

export const CustomerDetails = ({ customer }: CustomerDetailsProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const createNewBooking = () => {
    const { id, booking_count, profile } = customer;
    dispatch(setBookingCreate({
      customer: {
        id,
        profile_id: profile.id,
        first_name: profile.first_name,
        last_name: profile.last_name ?? "",
        full_name: `${profile.first_name} ${profile.last_name ?? ""}`,
        birthday: profile.birthday,
        avatar: profile.avatar,
        email: profile.email,
        phone: profile.phone,
        bookings_count: booking_count,
      }
    }));
    navigate({ to: "/bookings/create" });
  }

  return (
    <div className="mt-2.5">
      <div className="mt-8">
        <div className="grid grid-cols-5 gap-8 w-full">
          <div className="col-span-3 space-y-8">
            <Card>
              <CardHeader className="flex-row items-center gap-4">
                <div className="relative">
                  <Avatar size={"xl"} id={customer.id} name={customer.profile.full_name} avatar_url={customer.profile.avatar} />
                </div>
                <div className="flex justify-between gap-4 flex-1">
                  <div className="space-y-0.5 flex-1">
                    <CardTitle className="capitalize">{customer.profile.full_name}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2.5 pt-0">
                <Button onClick={createNewBooking} size={"size_54"} variant={"white"} animation={"toggle"} className="font-medium" iconLeft={<AddFillIcon width={22} height={22}/>}>Новое бронирование</Button>
                {/* <Button size={"size_54"} variant={"default"} animation={"toggle"} className="font-medium" iconLeft={<ShoppingCartIcon width={22} height={22} />}>Новый заказ</Button> */}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Профиль</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 pt-0">
                <CardContentLabel>
                  <CardContentLabelTitle>Email</CardContentLabelTitle>
                  <CardContentLabelDescription>{customer.profile.email ?? "-"}</CardContentLabelDescription>
                </CardContentLabel>

                <CardContentLabel>
                  <CardContentLabelTitle>Номер телефона</CardContentLabelTitle>
                  <CardContentLabelDescription>
                    <Copyable text={customer.profile.phone}/>
                  </CardContentLabelDescription>
                </CardContentLabel>

                <CardContentLabel>
                  <CardContentLabelTitle>Дата рождения</CardContentLabelTitle>
                  <CardContentLabelDescription>{customer.profile.birthday ?? "-"}</CardContentLabelDescription>
                </CardContentLabel>

                <CardContentLabel>
                  <CardContentLabelTitle>Заметка</CardContentLabelTitle>
                  <CardContentLabelDescription>{customer.note ?? "-"}</CardContentLabelDescription>
                </CardContentLabel>

              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col col-span-2 space-y-6">
            <Link to={"#"}>
              <Card>
                <CardHeader>
                  <CardTitle>Бронирования</CardTitle>
                  <CardDescription>{customer.booking_count ?? `${customer.profile.first_name} пока ничего не бронировал.`}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  )
}
