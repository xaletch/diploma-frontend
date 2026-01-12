import type { SVGProps } from "react";
const SvgCookie = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M21 11.944a8.96 8.96 0 0 1-2.644 6.422c-3.46 3.459-9.122 3.497-12.628.084A9 9 0 0 1 12.056 3a.76.76 0 0 1 .732.919 3 3 0 0 0 2.887 3.656.75.75 0 0 1 .75.75 3 3 0 0 0 3.656 2.888.76.76 0 0 1 .919.73"
      opacity={0.2}
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 11.944a8.96 8.96 0 0 1-2.644 6.422c-3.46 3.459-9.122 3.497-12.628.084A9 9 0 0 1 12.056 3a.76.76 0 0 1 .732.919 3 3 0 0 0 2.887 3.656.75.75 0 0 1 .75.75 3 3 0 0 0 3.656 2.888.76.76 0 0 1 .919.73"
    />
    <path
      fill="currentColor"
      d="M14.625 17.25a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25M8.625 16.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25M7.875 11.25a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25M12.75 12.75a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25"
    />
  </svg>
);
export default SvgCookie;
