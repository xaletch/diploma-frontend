import type { IEmployeeDetail } from "@/entities/employee";
import { EmployeeForm } from "./employee-form"
import { useEmployeeEdit } from "../../model/hooks/edit.hook";

interface EmployeeEditWrapperProps {
  data: IEmployeeDetail;
  location_id: string;
}

export const EmployeeEditWrapper = ({ data, location_id }: EmployeeEditWrapperProps) => {
  const { onSubmit, isLoading } = useEmployeeEdit(data.id, location_id);

  return (
    <div className="mt-8">
      <div className="max-w-140 mx-auto space-y-8 relative">
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
