import type { SVGProps } from "react";
const SvgBan = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.5 10a7.5 7.5 0 1 0 15 0 7.5 7.5 0 0 0-15 0M4.75 4.75l10.5 10.5"
    />
  </svg>
);
export default SvgBan;
