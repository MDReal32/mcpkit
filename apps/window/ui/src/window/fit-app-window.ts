import { FORM_WINDOW_BINDINGS } from "@usemcpkit/core";
import { APP_WINDOW_WIDTH } from "../const";
import { callWindowBinding } from "./call-window-binding";

/** Sizes the CLI's native window to the card; in a browser tab there is no such window and nothing happens. */
export const fitAppWindow = () => {
  callWindowBinding(FORM_WINDOW_BINDINGS.fit, {
    width: APP_WINDOW_WIDTH,
    height: document.documentElement.scrollHeight,
  });
};
