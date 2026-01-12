import type { SVGProps } from "react";
const SvgArrowsDownUp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m14 22-4 4-4-4M10 6v20M18 10l4-4 4 4M22 26V6"
    />
  </svg>
);
export default SvgArrowsDownUp;
