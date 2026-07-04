import type { SVGProps } from "react";
const SvgCreditCard = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="currentColor"
      d="M4.178 3.332a2.5 2.5 0 0 0-2.5 2.5v8.333a2.5 2.5 0 0 0 2.5 2.5h11.667a2.5 2.5 0 0 0 2.5-2.5V5.832a2.5 2.5 0 0 0-2.5-2.5zm0 1.666h11.667c.46 0 .833.374.833.834v5.833H3.345V5.832c0-.46.373-.834.833-.834m8.334 1.667a.834.834 0 0 0 0 1.667h1.666a.834.834 0 0 0 0-1.667zm-9.167 6.667h13.333v.833c0 .46-.373.833-.833.833H4.178a.834.834 0 0 1-.833-.833z"
    />
  </svg>
);
export default SvgCreditCard;
