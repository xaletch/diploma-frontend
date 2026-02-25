import { Link, useNavigate } from "@tanstack/react-router"
import { companySelector } from "../model/selector/company.selector";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useGetSpecializationQuery } from "../service/company.service";
import SvgChevronRight from "@/shared/icons/ChevronRight";

export const CompanySelectService = () => {
  const navigate = useNavigate();
  const { company } = useSelector(companySelector);
  const { data } = useGetSpecializationQuery();

  useEffect(() => {
    if (!company) {
      navigate({ to: "/company/create" });
    }
  }, [company, navigate]);

  return (
    <div className={"max-w-220 mx-auto w-full pt-10 lg:pt-20 pb-28 px-5"}>
      <h1 className="text-32 leading-8 font-extrabold">В какой индустрии работает ваш бизнес?</h1>
      <div className="mt-8 md:mt-10">
        <div className="grid grid-cols-1 580:grid-cols-2 820:grid-cols-3 gap-3.5">
          {data && data.map((item, index) => (
            <Link 
              to={`/company/create/service/3`} 
              params={{ service_id: item.id }} 
              key={index} 
            >
              <div className="p-3.5 pr-5 rounded-3xl bg-card block">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-10 bg-warn-color-icon/60">
                      <img src={item.icon} alt={item.name} className="w-8.5 h-8.5" />
                    </div>
                    <p className="text-lg font-bold leading-5">{item.name}</p>
                  </div>
                  <div className="w-9 h-9 rounded-10 bg-white flex items-center justify-center">
                    <SvgChevronRight width={20} height={20} />
                  </div>
                </div>
                <div>
                  <p className="text-11 leading-3.5 font-normal mt-1.5">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
