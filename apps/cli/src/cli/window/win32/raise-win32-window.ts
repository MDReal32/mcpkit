import type { Pointer } from "bun:ffi";
import { USER32_PATH, WIN32_TOPMOST } from "../const";
import type { User32 } from "../types/user32";

/** Keeps the form's window above every other window and brings it to the foreground. */
export const raiseWin32Window = async (window: Pointer) => {
  const { dlopen, FFIType } = await import("bun:ffi");
  const user32 = dlopen<User32>(USER32_PATH, {
    SetWindowPos: {
      args: [FFIType.ptr, FFIType.i64, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.u64],
      returns: FFIType.bool,
    },
    SetForegroundWindow: { args: [FFIType.ptr], returns: FFIType.bool },
  });
  user32.symbols.SetWindowPos(window, WIN32_TOPMOST.insertAfter, 0, 0, 0, 0, WIN32_TOPMOST.flags);
  user32.symbols.SetForegroundWindow(window);
  user32.close();
};
