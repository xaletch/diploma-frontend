import { useState } from "react";
import type { LocationType } from "../schema/location.schema";
import { useEditLocationMutation, usePhotoLocationMutation, type UpdateLocationCredentials } from "@/entities/location";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { timezoneCredSchema } from "@/shared/schemas/timezone.schema";
import { omitNullValues } from "@/shared/lib";
import { getErrorMessage } from "@/shared/utils";

interface EditLocationReturnProps {
  isLoading: boolean;
  onSubmit: (data: LocationType, locationId: string) => Promise<void>;
}

export const useEditLocation = (): EditLocationReturnProps => {
  const [isLoading, setIsLoading] = useState(false);

  const [location] = useEditLocationMutation();
  const [uploadPhoto] = usePhotoLocationMutation();

  const navigate = useNavigate();

  const onSubmit = async (data: LocationType, locationId: string): Promise<void> => {
    setIsLoading(true);
    try {
      const { timezone, timezone_offset } = timezoneCredSchema.parse(data.timezone);
      
      const { avatar, ...rest } = data;
      const payload = {
        location_id: locationId,
        body: omitNullValues({
          ...rest,
          city: "Москва",
          region: "Московская область",

          timezone: timezone,
          timezone_offset: timezone_offset,
          lat: parseFloat(data.lat),
          lng: parseFloat(data.lng),
        }),
      } satisfies UpdateLocationCredentials;

      await location(payload).unwrap();
      if (avatar) {
        const formData = new FormData();
        formData.append("file", avatar);
        await uploadPhoto({ location_id: locationId, body: formData}).unwrap();
      }

      navigate({ to: `/business/locations/${locationId}` });
    }
    catch (err) {
      console.error("Не удалось обновить локацию", err);
      toast.error(getErrorMessage(err));
    }
    finally {
      setIsLoading(false);
    }
  }

  return { isLoading, onSubmit }
}