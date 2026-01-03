import type { SVGProps } from "react";
const SvgError = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="#F36A61"
      fillRule="evenodd"
      d="M3.541 7.174C5.487 3.724 6.46 2 8 2s2.513 1.725 4.459 5.174l.242.43c1.617 2.867 2.425 4.3 1.695 5.348S11.858 14 8.242 14h-.484c-3.616 0-5.423 0-6.154-1.048s.078-2.481 1.695-5.348zM8 4.834a.5.5 0 0 1 .5.5v3.333a.5.5 0 0 1-1 0V5.333a.5.5 0 0 1 .5-.5m0 6.5A.667.667 0 1 0 8 10a.667.667 0 0 0 0 1.333"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgError;
