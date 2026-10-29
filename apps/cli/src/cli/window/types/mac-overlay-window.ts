import type { Pointer } from "bun:ffi";

export interface MacOverlayWindow {
  /** The NSPanel to hand to `webview_create`, so webview neither creates a window nor activates the app. */
  window: Pointer;
  /** Centers, focuses and shows the panel on the active Space, over a full-screen app too. */
  show: () => void;
  /** Frees the close callback once the event loop has ended. */
  dispose: () => void;
}
