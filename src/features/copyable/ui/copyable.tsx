import { Button } from "@/shared/ui";
import { useClipboard } from "../model/hook/clipboard.hook";
import { ArrowCircleIcon, CopyIcon } from "@/shared/icons";

interface CopyableProps {
  text?: string;
}

export const Copyable = ({ text }: CopyableProps) => {
  const { copied, copy } = useClipboard();

  if (!text) return <>-</>;

  return (
    <div className="flex items-center gap-1.5 group w-fit" onClick={() => copy(text)}>
      <p>{text}</p>
      <Button type={"button"} className={`group-hover:opacity-100 transition-opacity text-primary opacity-0`} variant={"ghost"} size={"icon_20"}>
        {copied ? <ArrowCircleIcon width={18} height={18} /> : <CopyIcon width={18} height={18} />}
      </Button>
    </div>
  )
}
