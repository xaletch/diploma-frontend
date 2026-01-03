import { Button } from "@/shared/ui";
import { useCompanyCreate } from "../model/hook/company-create.hook";
import { CompanyCreateForm, CompanyCreateIndustry, CompanyCreateService } from "./components";
import SvgChevronRight from "@/shared/icons/ChevronRight";

export const CompanyCreate = () => {
  const { setCompany, step, selectSpecialization, selectIndustry, specialization, isLoading, create, prevStep } = useCompanyCreate();

  return (
    <div className={`max-w-140 mx-auto w-full pt-10 lg:pt-20 pb-28 px-5 flex-1 ${step === 1 ? "max-w-140" : "max-w-220"}`}>
      <h1 className="text-32 leading-8 font-extrabold">
        {step === 1 ? "Создание компании" : step === 2 || step === 3 ? "В какой индустрии работает ваш бизнес?" : null}
      </h1>
      <div className="mt-8 md:mt-10 w-full">
        {step === 1 && <CompanyCreateForm setCompany={setCompany} />}
        {step === 2 && <CompanyCreateService selectSpecialization={selectSpecialization} />}
        {step === 3 && <CompanyCreateIndustry specialization={specialization} selectIndustry={selectIndustry} isLoading={isLoading} create={create} />}
      </div>

      {step === 2 && (
        <div className="left-0 right-0 mx-auto fixed bottom-0 flex justify-center md:bg-transparent backdrop-blur-xs bg-black/4 py-6 rounded-t-3xl px-5">
          <Button
            type={"button"}
            variant={"prev"}
            size={"size_48"}
            className={"w-full md:max-w-50"}
            iconLeft={<SvgChevronRight width={20} height={20} className="rotate-180" />}
            onClick={prevStep}
          >
            Назад
          </Button>
        </div>
      )}
    </div>
  )
}
