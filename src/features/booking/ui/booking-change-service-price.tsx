import { Input } from "@/shared/ui"
import type { ServiceSettingType } from "../model/types/booking-setting-service.type";

interface BookingChangeServicePriceProps {
  price: number | undefined;
  setSetting: React.Dispatch<React.SetStateAction<ServiceSettingType>>;
}

export const BookingChangeServicePrice = ({ price, setSetting }: BookingChangeServicePriceProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const num = Number(value);

    if (!isNaN(num)) {
      setSetting(p => {
        if (!p.service) return p;
        return { ...p, service: { ...p.service, prices: { ...p.service.prices, price: num } } };
      });
    }
  }

  return (
    <Input
      name={"service-price"}
      id={"service-price"}
      type={"number"}
      inputSize={"size_60"}
      value={price ?? ""}
      onChange={handleChange}
      label={"RUB"}
      step={1}
    />
  )
}
