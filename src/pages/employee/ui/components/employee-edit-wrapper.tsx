import type { IEmployeeDetail } from "@/entities/employee";
import { EmployeeForm } from "./employee-form"
import { useEmployeeEdit } from "../../model/hooks/edit.hook";

interface EmployeeEditWrapperProps {
  data: IEmployeeDetail;
  location_id: string;
}

export const EmployeeEditWrapper = ({ data, location_id }: EmployeeEditWrapperProps) => {
  const { onSubmit, isLoading } = useEmployeeEdit(data.id, data.profile.id, location_id);

  return (
    <div className="mt-8">
      <div className="relative">
        <EmployeeForm
          data={data}
          onSubmit={onSubmit}
          isEdit
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
