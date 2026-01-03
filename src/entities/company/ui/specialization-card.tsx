import type { ISpecialization } from "@/pages/company/model/type/specialization.type";
import SvgChevronRight from "@/shared/icons/ChevronRight"

type Specialization = {
  isSelect: true;
  selectSpecialization: (specialization: ISpecialization) => void;
  prev?: never;
} | {
  isSelect: false;
  selectSpecialization?: never;
  prev: () => void;
}

type SpecializationCardProps = Specialization & {
  id: number;
  icon: string;
  name: string;
  description: string;
}

export const SpecializationCard = ({ id, icon, name, description, selectSpecialization, isSelect, prev }: SpecializationCardProps) => {
  const handleClick = () => {
    if (!isSelect) return;
    selectSpecialization({ id, name, icon, description });
  }

  const handlePrev = () => {
    if (isSelect) return;
    prev();
  }

  return (
    <div 
      className={`p-3.5 pr-5 rounded-3xl bg-card block ${isSelect ? "cursor-pointer active:bg-muted/50 active:scale-99 hover:bg-muted hover:scale-102 duration-200" : ""}`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-10 bg-warn-color-icon/60">
            <img src={icon} alt={name} className="w-8.5 h-8.5" />
          </div>
          <p className="text-lg font-bold leading-5">{name}</p>
        </div>
        <div className={`w-9 h-9 rounded-10 bg-white flex items-center justify-center ${!isSelect ? "rotate-180 cursor-pointer active:scale-95 duration-200" : ""}`} onClick={handlePrev}>
          <SvgChevronRight width={20} height={20} />
        </div>
      </div>
      <div className="max-w-60">
        <p className="text-11 leading-3.5 font-normal mt-1.5">{description}</p>
      </div>
    </div>
  )
}
