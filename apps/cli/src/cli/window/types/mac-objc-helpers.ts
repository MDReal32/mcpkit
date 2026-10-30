import type { Pointer } from "bun:ffi";

export interface MacObjcHelpers {
  application: Pointer;
  objcClass: (name: string) => Pointer;
  selector: (name: string) => Pointer;
  /** A NUL-terminated UTF-8 copy of `text`, as a C string. */
  encode: (text: string) => Pointer;
}
