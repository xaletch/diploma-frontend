import { useEmployeeEditMutation, usePhotoEmployeeMutation, type IEmployeeUpdateCredentials } from "@/entities/employee"
import type { EmployeeSchemaType } from "../schemas";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { getErrorMessage } from "@/shared/utils";

interface UseEmployeeEditReturnProps {
  onSubmit: (data: EmployeeSchemaType) => Promise<void>;

  isLoading: boolean;
}

export const useEmployeeEdit = (employeeId: string, employeeProfileId: string, locationId: string): UseEmployeeEditReturnProps => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [edit] = useEmployeeEditMutation();
  const [uploadPhoto] = usePhotoEmployeeMutation();

  const onSubmit = async (data: EmployeeSchemaType): Promise<void> => {
    setIsLoading(true);
    try {
      const { avatar, ...rest } = data;
      const req = {
        body: {
          ...rest,
          role: Number(data.role),
        },
        employee_id: employeeId,
        location_id: locationId,
      } satisfies IEmployeeUpdateCredentials;

      const res = await edit(req).unwrap();

      if (avatar) {
        const formData = new FormData();
        formData.append("file", avatar);
        await uploadPhoto({
          location_id: locationId,
          user_id: employeeProfileId,
          body: formData
        }).unwrap();
      }

      navigate({ to: `/employees/users/${res.profile.id}` });
    }
    catch (error) {
      console.log("error edit", error);
      toast.error(getErrorMessage(error));
    }
    finally {
      setIsLoading(false);
    }
  }

  return {
    onSubmit,
    isLoading,
  }
}