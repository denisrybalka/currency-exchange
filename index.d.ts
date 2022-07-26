declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

interface ICurrency {
  currency: string;
  value: number;
  id: number;
}

interface IOption {
  value: string;
  label: string;
  imageSrc: string;
}
