/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="dva-model-extend" />

declare module "dva-model-extend";
declare module "react-infinite-scroller";
declare module "react-intl";
declare module "moment";
declare module "mathjs";
declare module "query-string";

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    PUBLIC_URL: string;
  }
}

declare module "*.bmp" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.sass" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "dva-loading" {
  const createLoading: any;
  export default createLoading;
}

declare module "redux-logger" {
  const createLogger: any;
  export { createLogger };
}
