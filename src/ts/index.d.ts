declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.gif";
declare module "@env" {
  export const API_KEY: string;
  export const NODE_ENV: "production" | "development";
}
