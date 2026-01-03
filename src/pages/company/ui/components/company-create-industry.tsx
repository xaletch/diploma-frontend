import { IndustryCard, SpecializationCard } from "@/entities/company";
import type { ISpecialization } from "../../model/type/specialization.type";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/app/providers/redux/config";
import { CompanyPrevStep } from "../../model/slice/company.slice";
import { useGetSpecializationIndustryQuery } from "../../service/company.service";
import { companySelector } from "../../model/selector/company.selector";
import { Button } from "@/shared/ui";

interface CompanyCreateIndustryProps {
  specialization: ISpecialization | undefined;
  selectIndustry: (industryId: number) => void;
  isLoading: boolean;
  create: () => Promise<void>;
}

export const CompanyCreateIndustry = ({ specialization, selectIndustry, isLoading, create }: CompanyCreateIndustryProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const { data } = useGetSpecializationIndustryQuery(specialization?.id ?? 1);
  const { industry } = useSelector(companySelector);

  if (!specialization) return;

  const prev = () => {
    dispatch(CompanyPrevStep());
  }
  
  return (
    <div>
      <div>
        <SpecializationCard
          {...specialization}
          isSelect={false}
          prev={prev}
        />
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-bold leading-5">Выберите свой тип бизнеса</h3>
        <div className="mt-4">
          <div className="grid grid-cols-2 480:grid-cols-3 sm:grid-cols-4 820:grid-cols-5 gap-2.5">
            {data && data.map((ind, index) => (
              <IndustryCard 
                key={index} 
                {...ind} 
                industry={industry} 
                selectIndustry={selectIndustry}
              />
            ))}
          </div>
        </div>
      </div>
      {industry !== 0 && (
        <div className="left-0 right-0 mx-auto fixed bottom-0 flex justify-center md:bg-transparent backdrop-blur-xs bg-black/4 py-6 rounded-t-3xl px-5">
          <Button
            type={"button"}
            className={"w-full md:max-w-50 font-normal"}
            onClick={create}
            disabled={isLoading}
            isLoading={isLoading}
          >
            Сохранить
          </Button>
        </div>
      )}
    </div>
  )
}
