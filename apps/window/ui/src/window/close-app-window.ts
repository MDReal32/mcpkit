import { FORM_WINDOW_BINDINGS } from "@usemcpkit/core";
import { callWindowBinding } from "./call-window-binding";

/** A webview ignores `window.close`, so the native window closes through its binding; a browser tab closes itself. */
export const closeAppWindow = () => {
  if (!callWindowBinding(FORM_WINDOW_BINDINGS.close)) {
    window.close();
  }
};
