/** A button that opens `url` in a new tab; `{domain}`, `{webHost}` and `{server}` are filled in. */
export interface UiLinkAction {
  type: "link";
  label: string;
  url: string;
}
