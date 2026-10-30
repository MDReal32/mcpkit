export interface MacEditMenuItem {
  title: string;
  /** The Objective-C selector sent to the first responder, for example `paste:`. */
  action: string;
  /** The key pressed together with Cmd. */
  key: string;
  /** Also needs Shift, as Redo does. */
  shift?: boolean;
}
