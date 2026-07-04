import type { SVGProps } from "react";
const SvgCash = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="currentColor"
      d="M4.166 3.255a2.5 2.5 0 0 0-2.5 2.5v8.125a2.71 2.71 0 0 0 2.708 2.709h11.25a2.71 2.71 0 0 0 2.708-2.709V7.422a.833.833 0 0 0-.833-.833h-.833v-2.5a.833.833 0 0 0-.834-.834zm0 1.667h10.833v1.667H4.166a.833.833 0 1 1 0-1.667m0 3.333h12.5v5.625c0 .576-.467 1.042-1.042 1.042H4.374a1.04 1.04 0 0 1-1.042-1.042l.005-5.771s.299.149.829.146m10 2.5a.833.833 0 1 0 0 1.667.833.833 0 0 0 0-1.667"
    />
  </svg>
);
export default SvgCash;
