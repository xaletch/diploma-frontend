import { Button } from "@/shared/ui"

interface IndustryCardProps {
  id: number;
  name: string;
  industry: number;
  selectIndustry: (id: number) => void;
}

export const IndustryCard = ({ industry, id, name, selectIndustry }: IndustryCardProps) => {
  return (
    <Button
      variant={"industry"}
      size={"none"}
      className={`text-wrap! ${industry === id ? "border-primary" : ""}`}
      onClick={() => selectIndustry(id)}
    >
      <p className="text-xs 400:text-sm leading-4 font-medium text-center">{name}</p>
    </Button>
  )
}
