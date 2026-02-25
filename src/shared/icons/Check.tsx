import type { SVGProps } from "react";
const SvgCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M19.018 5.997c-.256 0-.523.084-.718.276l-8.707 8.594c-.257.253-.515.206-.717-.092l-2.996-4.42a1.034 1.034 0 0 0-1.405-.276.996.996 0 0 0-.28 1.38l2.995 4.42c.902 1.33 2.659 1.499 3.808.369l8.738-8.563a1 1 0 0 0 0-1.412 1.02 1.02 0 0 0-.718-.276"
    />
  </svg>
);
export default SvgCheck;
