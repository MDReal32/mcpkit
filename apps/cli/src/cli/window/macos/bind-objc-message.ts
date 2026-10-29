import { LIBOBJC_PATH } from "../const";

/**
 * `objc_msgSend` with one C signature. It is variadic in name only: each call site needs its own exact signature, so
 * every shape is a separate binding of the same symbol.
 */
export const bindObjcMessage = async <Result = void>(args: readonly number[], returns: number) => {
  const { dlopen, FFIType } = await import("bun:ffi");
  const library = dlopen<{ objc_msgSend: (...values: unknown[]) => Result }>(LIBOBJC_PATH, {
    objc_msgSend: { args: [FFIType.ptr, FFIType.ptr, ...args], returns },
  });
  return library.symbols.objc_msgSend;
};
