import type { SVGProps } from "react";
const SvgChevron = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      fill="#fff"
      d="M11.123 8.582 8.133 4.09a.764.764 0 0 0-1.05-.21.77.77 0 0 0-.21 1.053L9.58 9.004l-2.709 4.071a.77.77 0 0 0 .21 1.053.764.764 0 0 0 1.051-.21l2.99-4.493a.77.77 0 0 0 0-.843"
    />
  </svg>
);
export default SvgChevron;
