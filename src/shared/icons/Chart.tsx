import type { SVGProps } from "react";
const SvgChart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="currentColor"
      d="M5.831 1.666c-.92 0-1.666.746-1.666 1.666v10c0 .92.746 1.667 1.666 1.667h1.667c.921 0 1.667-.746 1.667-1.667v-10c0-.92-.746-1.666-1.667-1.666zm0 1.666h1.667v10H5.831zm6.667 3.334c-.92 0-1.666.746-1.666 1.666v5c0 .92.745 1.667 1.666 1.667h1.667c.92 0 1.667-.746 1.667-1.667v-5c0-.92-.746-1.666-1.667-1.666zm0 1.666h1.667v5h-1.667zm-8.333 8.334a.834.834 0 0 0 0 1.666h11.667a.833.833 0 0 0 0-1.666z"
    />
  </svg>
);
export default SvgChart;
