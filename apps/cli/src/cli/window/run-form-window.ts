import { FORM_WINDOW_BINDINGS } from "@usemcpkit/core";
import { FORM_WINDOW_SIZE, FORM_WINDOW_TITLE, WEBVIEW_SIZE_HINT } from "./const";
import { loadWebviewLibrary } from "./load-webview-library";
import { createMacOverlayWindow } from "./macos/create-mac-overlay-window";
import { readFitSize } from "./read-fit-size";
import { raiseWin32Window } from "./win32/raise-win32-window";

/**
 * Shows `url` in a native window (WebKit on macOS, WebView2 on Windows, WebKitGTK on Linux) above other windows, and
 * blocks until it closes. The page closes it and fits it to its card through two bound functions, since a webview has
 * no `window.close`.
 */
export const runFormWindow = async (url: string) => {
  const { ptr, CString, FFIType, JSCallback } = await import("bun:ffi");
  const { symbols, close } = await loadWebviewLibrary();
  const encode = (text: string) => ptr(new TextEncoder().encode(`${text}\0`));
  const terminate = () => symbols.webview_terminate(webview);
  const overlay = process.platform === "darwin" ? await createMacOverlayWindow(terminate) : undefined;
  const webview = symbols.webview_create(0, overlay?.window ?? null);
  const closeWindow = new JSCallback(terminate, {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  });
  const fitWindow = new JSCallback(
    (_seq, request) => {
      const size = readFitSize(String(new CString(request)));
      if (size) {
        symbols.webview_set_size(webview, size.width, size.height, WEBVIEW_SIZE_HINT.fixed);
      }
    },
    { args: [FFIType.ptr, FFIType.ptr, FFIType.ptr], returns: FFIType.void },
  );
  symbols.webview_set_title(webview, encode(FORM_WINDOW_TITLE));
  symbols.webview_set_size(webview, FORM_WINDOW_SIZE.width, FORM_WINDOW_SIZE.height, WEBVIEW_SIZE_HINT.none);
  symbols.webview_bind(webview, encode(FORM_WINDOW_BINDINGS.close), closeWindow.ptr, null);
  symbols.webview_bind(webview, encode(FORM_WINDOW_BINDINGS.fit), fitWindow.ptr, null);
  symbols.webview_navigate(webview, encode(url));
  if (overlay) {
    overlay.show();
  } else if (process.platform === "win32") {
    await raiseWin32Window(symbols.webview_get_window(webview));
  }
  symbols.webview_run(webview);
  symbols.webview_destroy(webview);
  closeWindow.close();
  fitWindow.close();
  overlay?.dispose();
  close();
};
