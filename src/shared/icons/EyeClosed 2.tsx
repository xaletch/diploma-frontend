import type { SVGProps } from "react";
const SvgEyeClosed = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="icon icon-tabler icons-tabler-outline icon-tabler-eye-closed"
    viewBox="0 0 24 24"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <path d="M21 9q-3.6 4-9 4T3 9M3 15l2.5-3.8M21 14.976 18.508 11.2M9 17l.5-4M15 17l-.5-4" />
  </svg>
);
export default SvgEyeClosed;
