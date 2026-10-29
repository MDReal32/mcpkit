import type { Pointer } from "bun:ffi";

export interface ObjcRuntime {
  objc_getClass: (name: Pointer) => Pointer;
  sel_registerName: (name: Pointer) => Pointer;
  objc_allocateClassPair: (superclass: Pointer, name: Pointer, extraBytes: number) => Pointer;
  class_addMethod: (cls: Pointer, selector: Pointer, implementation: Pointer, types: Pointer) => boolean;
  objc_registerClassPair: (cls: Pointer) => void;
}
