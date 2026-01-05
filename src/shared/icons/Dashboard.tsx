import type { SVGProps } from "react";
const SvgDashboard = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1.667 10a8.333 8.333 0 1 1 16.666 0 8.333 8.333 0 0 1-16.666 0m7.708-5.833c0-.346.28-.625.625-.625A6.458 6.458 0 1 1 3.542 10a.625.625 0 1 1 1.25 0A5.208 5.208 0 1 0 10 4.792a.625.625 0 0 1-.625-.625M10 6.042a.625.625 0 0 0 0 1.25 2.708 2.708 0 1 1 0 5.416.625.625 0 0 0 0 1.25 3.958 3.958 0 0 0 0-7.916"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgDashboard;
