import { useEmployeeEditMutation, type IEmployeeUpdateCredentials } from "@/entities/employee"
import type { EmployeeSchemaType } from "../schemas";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

interface UseEmployeeEditReturnProps {
  onSubmit: (data: EmployeeSchemaType) => Promise<void>;

  isLoading: boolean;
}

export const useEmployeeEdit = (employeeId: string, locationId: string): UseEmployeeEditReturnProps => {
  const [edit, { isLoading }] = useEmployeeEditMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: EmployeeSchemaType): Promise<void> => {
    try {
      const req = {
        body: {
          ...data,
          role: Number(data.role),
        },
        employee_id: employeeId,
        location_id: locationId,
      } satisfies IEmployeeUpdateCredentials;

      const res = await edit(req).unwrap();

      navigate({ to: `/employees/users/${res.profile.id}` });
    }
    catch (error) {
      console.log("error edit", error);
      toast.error(JSON.stringify(error));
    }
  }

  return {
    onSubmit,
    isLoading,
  }
}