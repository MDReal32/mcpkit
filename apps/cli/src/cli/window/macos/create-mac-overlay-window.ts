import type { Pointer } from "bun:ffi";
import {
  LIBOBJC_PATH,
  MAC_ACCESSORY_ACTIVATION_POLICY,
  MAC_MODAL_PANEL_WINDOW_LEVEL,
  MAC_OVERLAY_COLLECTION_BEHAVIOR,
  MAC_PANEL_STYLE_MASK,
  MAC_WINDOW_DELEGATE_CLASS,
  MAC_WINDOW_WILL_CLOSE_TYPES,
} from "../const";
import type { MacOverlayWindow } from "../types/mac-overlay-window";
import type { ObjcRuntime } from "../types/objc-runtime";
import { bindObjcMessage } from "./bind-objc-message";

/**
 * An NSPanel above every other window, a full-screen app included. The process becomes an accessory app (no Dock icon,
 * no switch away from a full-screen Space) before anything is shown, and the panel floats at modal-panel level on the
 * active Space. A window webview created itself would make the app a regular one and activate it, which leaves the
 * full-screen Space; a panel passed in skips that. `onClose` runs when the user closes it with its close button.
 */
export const createMacOverlayWindow = async (onClose: () => void) => {
  const { dlopen, FFIType, JSCallback, ptr } = await import("bun:ffi");
  const encode = (text: string) => ptr(new TextEncoder().encode(`${text}\0`));
  const runtime = dlopen<ObjcRuntime>(LIBOBJC_PATH, {
    objc_getClass: { args: [FFIType.ptr], returns: FFIType.ptr },
    sel_registerName: { args: [FFIType.ptr], returns: FFIType.ptr },
    objc_allocateClassPair: { args: [FFIType.ptr, FFIType.ptr, FFIType.u64], returns: FFIType.ptr },
    class_addMethod: { args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr], returns: FFIType.bool },
    objc_registerClassPair: { args: [FFIType.ptr], returns: FFIType.void },
  });
  const objcClass = (name: string) => runtime.symbols.objc_getClass(encode(name));
  const selector = (name: string) => runtime.symbols.sel_registerName(encode(name));
  const sendForPointer = await bindObjcMessage<Pointer>([], FFIType.ptr);
  const send = await bindObjcMessage([], FFIType.void);
  const sendInteger = await bindObjcMessage([FFIType.i64], FFIType.void);
  const sendFlag = await bindObjcMessage([FFIType.bool], FFIType.void);
  const sendPointer = await bindObjcMessage([FFIType.ptr], FFIType.void);

  const application = sendForPointer(objcClass("NSApplication"), selector("sharedApplication"));
  sendInteger(application, selector("setActivationPolicy:"), MAC_ACCESSORY_ACTIVATION_POLICY);

  const willClose = new JSCallback(onClose, { args: [FFIType.ptr, FFIType.ptr, FFIType.ptr], returns: FFIType.void });
  const delegateClass = runtime.symbols.objc_allocateClassPair(
    objcClass("NSObject"),
    encode(MAC_WINDOW_DELEGATE_CLASS),
    0,
  );
  runtime.symbols.class_addMethod(
    delegateClass,
    selector("windowWillClose:"),
    willClose.ptr,
    encode(MAC_WINDOW_WILL_CLOSE_TYPES),
  );
  runtime.symbols.objc_registerClassPair(delegateClass);
  const delegate = sendForPointer(sendForPointer(delegateClass, selector("alloc")), selector("init"));

  const panel = sendForPointer(sendForPointer(objcClass("NSPanel"), selector("alloc")), selector("init"));
  sendInteger(panel, selector("setStyleMask:"), MAC_PANEL_STYLE_MASK);
  sendFlag(panel, selector("setReleasedWhenClosed:"), false);
  sendFlag(panel, selector("setHidesOnDeactivate:"), false);
  sendInteger(panel, selector("setLevel:"), MAC_MODAL_PANEL_WINDOW_LEVEL);
  sendInteger(panel, selector("setCollectionBehavior:"), MAC_OVERLAY_COLLECTION_BEHAVIOR);
  sendPointer(panel, selector("setDelegate:"), delegate);

  const overlay: MacOverlayWindow = {
    window: panel,
    show: () => {
      send(panel, selector("center"));
      sendPointer(panel, selector("makeKeyAndOrderFront:"), null);
      sendFlag(application, selector("activateIgnoringOtherApps:"), true);
    },
    dispose: () => {
      willClose.close();
      runtime.close();
    },
  };
  return overlay;
};
