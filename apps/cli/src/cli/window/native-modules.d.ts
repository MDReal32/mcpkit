/** The part of Bun's FFI the form window uses; it exists only in the compiled binary, which runs on Bun. */
declare module "bun:ffi" {
  export type Pointer = number & { readonly __pointer: unique symbol };

  export const FFIType: {
    readonly i32: number;
    readonly i64: number;
    readonly u64: number;
    readonly bool: number;
    readonly ptr: number;
    readonly function: number;
    readonly void: number;
  };

  export interface FFIFunction {
    args: readonly number[];
    returns: number;
  }

  export interface Library<Symbols> {
    symbols: Symbols;
    close(): void;
  }

  export const dlopen: <Symbols>(path: string, symbols: Record<keyof Symbols, FFIFunction>) => Library<Symbols>;

  export const ptr: (view: ArrayBufferView) => Pointer;

  export class CString extends String {
    constructor(pointer: Pointer);
  }

  export class JSCallback {
    constructor(callback: (...args: Pointer[]) => void, definition: FFIFunction);
    readonly ptr: Pointer;
    close(): void;
  }
}

/** A native library imported as a file; Bun embeds it in the compiled binary and the import resolves to its path. */
declare module "*.dylib" {
  const path: string;
  export default path;
}

declare module "*.so" {
  const path: string;
  export default path;
}

declare module "*.dll" {
  const path: string;
  export default path;
}
