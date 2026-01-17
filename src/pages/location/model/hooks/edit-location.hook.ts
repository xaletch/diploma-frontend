import { useState } from "react";
import type { LocationType } from "../schema/location.schema";
import { useEditLocationMutation, type UpdateLocationRequest } from "@/entities/location";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { timezoneCredSchema } from "@/shared/schemas/timezone.schema";

interface EditLocationReturnProps {
  isLoading: boolean;
  onSubmit: (data: LocationType, locationId: string) => Promise<void>;
}

export const useEditLocation = (): EditLocationReturnProps => {
  const [isLoading, setIsLoading] = useState(false);
  const [location] = useEditLocationMutation();

  const navigate = useNavigate();

  const onSubmit = async (data: LocationType, locationId: string): Promise<void> => {
    setIsLoading(true);
    try {
      const { timezone, timezone_offset } = timezoneCredSchema.parse(data.timezone);
      const payload = {
        location_id: locationId,
        body: {
          ...data,
          city: "Москва",
          region: "Московская область",

          timezone: timezone,
          timezone_offset: timezone_offset,
          lat: parseFloat(data.lat),
          lng: parseFloat(data.lng),
        }
      } satisfies UpdateLocationRequest;

      await location(payload).unwrap();
      navigate({ to: `/business/locations/${locationId}` });
    }
    catch (err) {
      console.error("Не удалось обновить локацию", err);
      toast.error("Не удалось обновить локацию", { description: JSON.stringify(err) });
    }
    finally {
      setIsLoading(false);
    }
  }

  return { isLoading, onSubmit }
}