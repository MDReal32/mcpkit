import type { MacEditMenuItem } from "./types/mac-edit-menu-item";

export const FORM_WINDOW_TITLE = "mcpkit";

/** The size the window opens at, before the page reports the size of its card. */
export const FORM_WINDOW_SIZE = { width: 520, height: 640 } as const;

/** `WEBVIEW_HINT_*` from webview.h. */
export const WEBVIEW_SIZE_HINT = { none: 0, fixed: 3 } as const;

export const LIBOBJC_PATH = "/usr/lib/libobjc.A.dylib";

/** `NSApplicationActivationPolicyAccessory`: no Dock icon, and the panel may show over another app's full-screen Space. */
export const MAC_ACCESSORY_ACTIVATION_POLICY = 1;

/** `NSModalPanelWindowLevel`: above normal windows, like a system dialog. */
export const MAC_MODAL_PANEL_WINDOW_LEVEL = 8;

/** `NSWindowCollectionBehaviorMoveToActiveSpace | NSWindowCollectionBehaviorFullScreenAuxiliary`. */
export const MAC_OVERLAY_COLLECTION_BEHAVIOR = (1 << 1) | (1 << 8);

export const USER32_PATH = "user32.dll";

/** `HWND_TOPMOST`, and `SWP_NOSIZE | SWP_NOMOVE | SWP_SHOWWINDOW` for SetWindowPos. */
export const WIN32_TOPMOST = { insertAfter: -1, flags: 0x1 | 0x2 | 0x40 } as const;

/** `NSWindowStyleMaskTitled | NSWindowStyleMaskClosable`; webview adds miniaturize when it sets the size. */
export const MAC_PANEL_STYLE_MASK = (1 << 0) | (1 << 1);

export const MAC_WINDOW_DELEGATE_CLASS = "McpkitFormWindowDelegate";

/** Objective-C type encoding of `- (void)windowWillClose:(NSNotification *)notification`. */
export const MAC_WINDOW_WILL_CLOSE_TYPES = "v@:@";

/** Links the page may hand to the default browser; nothing else leaves the window. */
export const WINDOW_LINK_PROTOCOLS: readonly string[] = ["https:", "http:"];

/** `NSEventModifierFlagCommand` and `NSEventModifierFlagShift`. */
export const MAC_COMMAND_KEY_MASK = 1 << 20;

export const MAC_SHIFT_KEY_MASK = 1 << 17;

/**
 * The Edit menu key equivalents a text field needs. The panel is shown by an accessory app that has no menu bar, and
 * macOS routes Cmd+V, Cmd+C and the other shortcuts through the application's main menu, so without these items
 * pasting into the page does nothing. Each action goes to the first responder, the focused field of the webview.
 */
export const MAC_EDIT_MENU_ITEMS: readonly MacEditMenuItem[] = [
  { title: "Undo", action: "undo:", key: "z" },
  { title: "Redo", action: "redo:", key: "z", shift: true },
  { title: "Cut", action: "cut:", key: "x" },
  { title: "Copy", action: "copy:", key: "c" },
  { title: "Paste", action: "paste:", key: "v" },
  { title: "Select All", action: "selectAll:", key: "a" },
];
