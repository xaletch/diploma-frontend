import type { SVGProps } from "react";
const SvgTranslate = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21.75 20.25 16.5 9.75l-5.25 10.5M12.75 17.25h7.5M8.25 3v2.25M2.25 5.25h12M11.25 5.25a9 9 0 0 1-9 9"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5.756 8.25a9.01 9.01 0 0 0 8.494 6"
    />
  </svg>
);
export default SvgTranslate;
