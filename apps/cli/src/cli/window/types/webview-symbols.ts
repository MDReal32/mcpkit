import type { Pointer } from "bun:ffi";

/** The calls of the webview C library (github.com/webview/webview) the form window makes. */
export interface WebviewSymbols {
  webview_create: (debug: number, window: Pointer | null) => Pointer;
  webview_destroy: (webview: Pointer) => void;
  webview_run: (webview: Pointer) => void;
  webview_terminate: (webview: Pointer) => void;
  webview_get_window: (webview: Pointer) => Pointer;
  webview_set_title: (webview: Pointer, title: Pointer) => void;
  webview_set_size: (webview: Pointer, width: number, height: number, hint: number) => void;
  webview_navigate: (webview: Pointer, url: Pointer) => void;
  webview_bind: (webview: Pointer, name: Pointer, callback: Pointer, arg: Pointer | null) => void;
}
