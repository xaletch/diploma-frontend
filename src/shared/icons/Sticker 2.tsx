import type { SVGProps } from "react";
const SvgSticker = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M12.75 20.25v-3a4.5 4.5 0 0 1 4.5-4.5h3c-.75 2.25-5.25 6.75-7.5 7.5"
      opacity={0.2}
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12.75 20.25h-4.5a4.5 4.5 0 0 1-4.5-4.5v-7.5a4.5 4.5 0 0 1 4.5-4.5h7.5a4.5 4.5 0 0 1 4.5 4.5v4.5c-.75 2.25-5.25 6.75-7.5 7.5"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12.75 20.25v-3a4.5 4.5 0 0 1 4.5-4.5h3"
    />
  </svg>
);
export default SvgSticker;
