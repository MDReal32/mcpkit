import type { Pointer } from "bun:ffi";
import { MAC_COMMAND_KEY_MASK, MAC_EDIT_MENU_ITEMS, MAC_SHIFT_KEY_MASK } from "../const";
import type { MacObjcHelpers } from "../types/mac-objc-helpers";
import { bindObjcMessage } from "./bind-objc-message";

/** Gives the application a main menu with an Edit menu, so Cmd+V, Cmd+C, Cmd+X, Cmd+A and Cmd+Z work in the page. */
export const installMacEditMenu = async ({ application, objcClass, selector, encode }: MacObjcHelpers) => {
  const { FFIType } = await import("bun:ffi");
  const sendForPointer = await bindObjcMessage<Pointer>([], FFIType.ptr);
  const sendPointerForPointer = await bindObjcMessage<Pointer>([FFIType.ptr], FFIType.ptr);
  const sendItemInit = await bindObjcMessage<Pointer>([FFIType.ptr, FFIType.ptr, FFIType.ptr], FFIType.ptr);
  const sendPointer = await bindObjcMessage([FFIType.ptr], FFIType.void);
  const sendInteger = await bindObjcMessage([FFIType.i64], FFIType.void);

  const create = (className: string) =>
    sendForPointer(sendForPointer(objcClass(className), selector("alloc")), selector("init"));
  const string = (text: string) =>
    sendPointerForPointer(objcClass("NSString"), selector("stringWithUTF8String:"), encode(text));

  const mainMenu = create("NSMenu");
  const editItem = create("NSMenuItem");
  const editMenu = sendPointerForPointer(
    sendForPointer(objcClass("NSMenu"), selector("alloc")),
    selector("initWithTitle:"),
    string("Edit"),
  );
  for (const { title, action, key, shift } of MAC_EDIT_MENU_ITEMS) {
    const item = sendItemInit(
      sendForPointer(objcClass("NSMenuItem"), selector("alloc")),
      selector("initWithTitle:action:keyEquivalent:"),
      string(title),
      selector(action),
      string(key),
    );
    if (shift) {
      sendInteger(item, selector("setKeyEquivalentModifierMask:"), MAC_COMMAND_KEY_MASK | MAC_SHIFT_KEY_MASK);
    }
    sendPointer(editMenu, selector("addItem:"), item);
  }
  sendPointer(editItem, selector("setSubmenu:"), editMenu);
  sendPointer(mainMenu, selector("addItem:"), editItem);
  sendPointer(application, selector("setMainMenu:"), mainMenu);
};
