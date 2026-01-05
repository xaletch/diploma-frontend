import { DashboardCard } from "@/entities/dashboard"

export const DashboardStatisticsNum = () => {
  return (
    <div className="grid grid-cols-3 gap-5">

      <DashboardCard 
        title={"Общий доход"} 
        value={"250.00"} 
        isIncreased={true} 
        percentage={"+20"} 
        description={"В этом месяце растем"}
        currency={"RUB"}
        recommendation={"Продолжайте в том же духе!"}
      />

      <DashboardCard 
        title={"Новые клиенты"} 
        value={"3"} 
        isIncreased={false} 
        percentage={"-10"} 
        description={"Снижение на 10% за этот период"}
        recommendation={"Требует уделить больше внимания"}
        />

      <DashboardCard 
        title={"Темп роста"} 
        value={"2.7%"} 
        isIncreased={true} 
        percentage={"+2.7"} 
        description={"Умеренный рост"}
        recommendation={"Соответствует прогнозам роста"}
      />

    </div>
  )
}
