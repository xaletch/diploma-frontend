import { useCallback, useEffect, useState } from "react";
import { FilePicker } from "./file-picker";
import { cn } from "@/shared/utils";

interface ImagePickerProps {
  value?: File | null;
  onChange: (file: File | null) => void;
  preview_url?: string | null;
  disabled?: boolean;
  className?: string;
  sizeCls?: string;
  iconCls?: string;
  children?: React.ReactNode;
}

export const ImagePicker = ({ value, onChange, preview_url, disabled=false, className="", sizeCls="", iconCls="", children }: ImagePickerProps) => {
  const [localPreview, setLocalPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setLocalPreview(null);
      return;
    }

    const url = URL.createObjectURL(value);
    setLocalPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  const handlePick = useCallback((f: File[]) => {
    if (f[0]) onChange(f[0])
  }, [onChange]);

  const preview = localPreview ?? preview_url ?? null;

  return (
    <FilePicker
      accept={"image/png, image/jpeg, image/webp, .png, .jpeg, .webp"}
      onPick={handlePick}
      disabled={disabled}
      className={cn(sizeCls, className)}
      iconCls={iconCls}
    >

      {preview ? (
        <div className={"relative"}>
          <img
            src={preview}
            alt={"Выбранный файл"}
            className={"w-full h-full object-cover"}
          />
        </div>
      ) : children}

    </FilePicker>
  )
}
