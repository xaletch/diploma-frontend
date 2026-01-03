import SvgError from "@/shared/icons/Error";

export type ErrorProps = {
  msg?: string | null;
};

export const Error = ({ msg }: ErrorProps) => {
  if (!msg) return null;

  return (
    <div
      role="alert"
      aria-label={msg}
      className="mt-0.5 flex items-end gap-1"
    >
      <span className="w-3.5 ">
        <SvgError width={14} height={14} />
      </span>
      <p className="text-xs font-normal text-red leading-3">{msg}</p>
    </div>
  );
};
