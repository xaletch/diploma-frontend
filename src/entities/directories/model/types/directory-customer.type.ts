export interface IDirectoryCustomer {
  id: string;             // ID ПРОФИЛЯ КЛИЕНТА В КОМПАНИИ
  profile_id: string;     // ID ПРОФИЛЯ КЛИЕНТА
  first_name: string;
  last_name: string;
  full_name: string;
  birthday: string | null;
  avatar: string | null;
  email: string;
  phone: string;
  bookings_count: number;
}
