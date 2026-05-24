import { cn } from "@/shared/utils";
import { Button } from "../../button";
import { useRef } from "react";
import { FilePngIcon } from "@/shared/icons";

interface FilePickerProps {
  accept?: string;
  capture?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  onPick: (f: File[]) => void;
  className?: string;
  iconCls?: string;
  children?: React.ReactNode;
}

export const FilePicker = ({ accept, capture, multiple=false, disabled=false, onPick, className="", iconCls, children }: FilePickerProps) => {
  const ref = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (!disabled) ref.current?.click();
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length) onPick(files);
    e.target.value = "";
  }
  
  return (
    <>
      <Button
        type={"button"}
        variant={"transparent"}
        size={"none"}
        onClick={handleClick}
        disabled={disabled}
        className={cn("w-55 h-55 bg-card flex items-center justify-center overflow-hidden rounded-3xl", className)}
      >
        {children ? children : (
          <div className={cn("size-18.5", iconCls)}>
            <FilePngIcon />
          </div>
        )}
      </Button>

      <input
        ref={ref}
        type={"file"}
        accept={accept}
        capture={capture}
        multiple={multiple}
        onChange={handleChange}
        className={"hidden"}
      />
    </>
  )
}
