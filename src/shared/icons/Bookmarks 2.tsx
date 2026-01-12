import type { SVGProps } from "react";
const SvgBookmarks = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      fill="currentColor"
      d="M24 4H12a1 1 0 0 0-1 1v3h9a1 1 0 0 1 1 1v12.138L25 24V5a1 1 0 0 0-1-1"
      opacity={0.2}
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m21 28-7-5-7 5V9a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 8V5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v19l-4-2.863"
    />
  </svg>
);
export default SvgBookmarks;
