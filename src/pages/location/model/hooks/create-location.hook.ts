import { useState } from "react";
import type { LocationType } from "../schema/location.schema";
import { useCreateLocationMutation, usePhotoLocationMutation, type LocationCredentials } from "@/entities/location";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { timezoneCredSchema } from "@/shared/schemas/timezone.schema";
import { getErrorMessage } from "@/shared/utils";

interface CreateLocationReturnProps {
  isLoading: boolean;
  onSubmit: (data: LocationType) => Promise<void>;
}

export const useCreateLocation = (): CreateLocationReturnProps => {
  const [isLoading, setIsLoading] = useState(false);

  const [location] = useCreateLocationMutation();
  const [uploadPhoto] = usePhotoLocationMutation();

  const navigate = useNavigate();

  const onSubmit = async (data: LocationType): Promise<void> => {
    setIsLoading(true);
    try {
      const { timezone, timezone_offset } = timezoneCredSchema.parse(data.timezone);
      const { avatar, ...rest } = data;

      const payload = {
        ...rest,
        city: "Москва",
        region: "Московская область",

        timezone: timezone,
        timezone_offset: timezone_offset,
        lat: parseFloat(data.lat),
        lng: parseFloat(data.lng),
      } satisfies LocationCredentials;

      const { id: location_id } = await location(payload).unwrap();

      if (avatar) {
        const formData = new FormData();
        formData.append("file", avatar);
        await uploadPhoto({ location_id, body: formData}).unwrap();
      }

      navigate({ to: "/business/locations" });
    }
    catch (err) {
      console.error("Не удалось создать локацию", err);
      toast.error(getErrorMessage(err));
    }
    finally {
      setIsLoading(false);
    }
  }

  return { isLoading, onSubmit }
}