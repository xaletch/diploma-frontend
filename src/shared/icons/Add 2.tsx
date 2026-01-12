import type { SVGProps } from "react";
const SvgAdd = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="currentColor"
      d="M10.012 1.627a8.333 8.333 0 1 0 0 16.667 8.333 8.333 0 0 0 0-16.667m0 1.667a6.667 6.667 0 1 1 0 13.334 6.667 6.667 0 0 1 0-13.334m0 2.5a.834.834 0 0 0-.834.833v2.5h-2.5a.833.833 0 0 0 0 1.667h2.5v2.5a.834.834 0 0 0 1.667 0v-2.5h2.5a.834.834 0 0 0 0-1.667h-2.5v-2.5a.834.834 0 0 0-.833-.833"
    />
  </svg>
);
export default SvgAdd;
