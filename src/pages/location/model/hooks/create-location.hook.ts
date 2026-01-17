import { useState } from "react";
import type { LocationType } from "../schema/location.schema";
import { useCreateLocationMutation, type LocationCredentials } from "@/entities/location";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { timezoneCredSchema } from "@/shared/schemas/timezone.schema";

interface CreateLocationReturnProps {
  isLoading: boolean;
  onSubmit: (data: LocationType) => Promise<void>;
}

export const useCreateLocation = (): CreateLocationReturnProps => {
  const [isLoading, setIsLoading] = useState(false);
  const [location] = useCreateLocationMutation();

  const navigate = useNavigate();

  const onSubmit = async (data: LocationType): Promise<void> => {
    setIsLoading(true);
    try {
      const { timezone, timezone_offset } = timezoneCredSchema.parse(data.timezone);
      const payload = {
        ...data,
        city: "Москва",
        region: "Московская область",

        timezone: timezone,
        timezone_offset: timezone_offset,
        lat: parseFloat(data.lat),
        lng: parseFloat(data.lng),
      } satisfies LocationCredentials;

      await location(payload).unwrap();
      navigate({ to: "/business/locations" });
    }
    catch (err) {
      console.error("Не удалось создать локацию", err);
      toast.error("Не удалось создать локацию", { description: JSON.stringify(err) });
    }
    finally {
      setIsLoading(false);
    }
  }

  return { isLoading, onSubmit }
}