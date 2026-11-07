import { FORM_WINDOW_BINDINGS } from "@usemcpkit/core";
import { callWindowBinding } from "./call-window-binding";

/** In the CLI's native window a link opens in the default browser instead of the dead `target="_blank"`. */
export const openWindowLink = (event: MouseEvent) => {
  const link = event.currentTarget;
  if (!(link instanceof HTMLAnchorElement)) {
    return;
  }
  if (callWindowBinding(FORM_WINDOW_BINDINGS.openLink, link.href)) {
    event.preventDefault();
  }
};
