/**
 * Typescript does not understand certain failes, like CSS
 * and then marks them as side-effects. So we declare them 
 * here to avoid an [noUncheckedSideEffectImports] error.
 */

declare module "*.css";
declare module "*.scss";
declare module "*.svg";

declare module 'bootstrap/scss/bootstrap.scss';
declare module '@/scss/main.scss';