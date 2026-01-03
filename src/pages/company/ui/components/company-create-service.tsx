import { SpecializationCard } from "@/entities/company"
import { useGetSpecializationQuery } from "../../service/company.service";
import type { ISpecialization } from "../../model/type/specialization.type";

interface CompanyCreateServiceProps {
  selectSpecialization: (specialization: ISpecialization) => void
}

export const CompanyCreateService = ({ selectSpecialization }: CompanyCreateServiceProps) => {
  const { data } = useGetSpecializationQuery();

  return (
    <div className="grid grid-cols-1 580:grid-cols-2 820:grid-cols-3 gap-3.5">
      {data && data.map((specialization, index) => (
        <SpecializationCard
          key={index} 
          {...specialization}
          selectSpecialization={selectSpecialization}
          isSelect
        />
      ))}
    </div>
  )
}
