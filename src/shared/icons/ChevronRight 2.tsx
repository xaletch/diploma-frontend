import type { SVGProps } from "react";
const SvgChevronRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="currentColor"
      d="M12.359 9.536 9.037 4.543A.85.85 0 0 0 7.87 4.31a.854.854 0 0 0-.234 1.17l3.01 4.524-3.01 4.524a.854.854 0 0 0 .234 1.17.85.85 0 0 0 1.167-.233l3.322-4.993a.86.86 0 0 0 0-.936"
    />
  </svg>
);
export default SvgChevronRight;
