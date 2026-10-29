import { resolveWebviewLibraryFile } from "./resolve-webview-library-file";
import type { WebviewSymbols } from "./types/webview-symbols";

export const loadWebviewLibrary = async () => {
  const { dlopen, FFIType } = await import("bun:ffi");
  const library = dlopen<WebviewSymbols>(await resolveWebviewLibraryFile(), {
    webview_create: { args: [FFIType.i32, FFIType.ptr], returns: FFIType.ptr },
    webview_destroy: { args: [FFIType.ptr], returns: FFIType.void },
    webview_run: { args: [FFIType.ptr], returns: FFIType.void },
    webview_terminate: { args: [FFIType.ptr], returns: FFIType.void },
    webview_get_window: { args: [FFIType.ptr], returns: FFIType.ptr },
    webview_set_title: { args: [FFIType.ptr, FFIType.ptr], returns: FFIType.void },
    webview_set_size: { args: [FFIType.ptr, FFIType.i32, FFIType.i32, FFIType.i32], returns: FFIType.void },
    webview_navigate: { args: [FFIType.ptr, FFIType.ptr], returns: FFIType.void },
    webview_bind: { args: [FFIType.ptr, FFIType.ptr, FFIType.function, FFIType.ptr], returns: FFIType.void },
  });
  return library;
};
