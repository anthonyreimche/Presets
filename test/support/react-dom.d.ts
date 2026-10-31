// The one React DOM export the fake API hands the extension as
// `api.reactDom.createPortal`. The template's devDependencies carry no
// @types/react-dom.

declare module "react-dom" {
  import type { ReactNode, ReactPortal } from "react";
  export function createPortal(children: ReactNode, container: Element | DocumentFragment): ReactPortal;
}
