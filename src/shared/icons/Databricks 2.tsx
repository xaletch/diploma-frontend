import type { SVGProps } from "react";
const SvgDatabricks = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="icon icon-tabler icons-tabler-outline icon-tabler-brand-databricks"
    viewBox="0 0 24 24"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <path d="m3 17 9 5 9-5v-3l-9 5-9-5v-3l9 5 9-5V8l-9 5-9-5 9-5 5.418 3.01" />
  </svg>
);
export default SvgDatabricks;
