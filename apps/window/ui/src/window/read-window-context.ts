import { FORM_WINDOW_CONTEXT, isJsonObject } from "@usemcpkit/core";
import type { WindowContext } from "../types/window-context";

/** What the window app defined for this page; undefined when a server serves the page to a browser instead. */
export const readWindowContext = () => {
  const context: unknown = Reflect.get(window, FORM_WINDOW_CONTEXT);
  if (!isJsonObject(context)) {
    return undefined;
  }
  const { api, session, request } = context;
  if (typeof api !== "string" || typeof session !== "string" || request === undefined) {
    throw new Error(`the window context has no api, session and request`);
  }
  const windowContext: WindowContext = { api, session, request };
  return windowContext;
};
