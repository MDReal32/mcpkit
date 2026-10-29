import type { Pointer } from "bun:ffi";

export interface User32 {
  SetWindowPos: (
    window: Pointer,
    insertAfter: number,
    x: number,
    y: number,
    width: number,
    height: number,
    flags: number,
  ) => boolean;
  SetForegroundWindow: (window: Pointer) => boolean;
}
