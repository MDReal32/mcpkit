/** HTTP contract between the CLI's loopback credentials form server and the page it serves. */
export const CREDENTIALS_FORM_API = {
  submit: "/api/submit",
  cancel: "/api/cancel",
  import: "/api/import",
} as const;

export const CREDENTIALS_REQUEST_ELEMENT_ID = "usemcpkit-request";

/**
 * Functions the CLI's native form window binds into the page: close it, fit it to `{ width, height }`, and open a link
 * in the default browser (a webview has no tabs, so `target="_blank"` links go nowhere).
 */
export const FORM_WINDOW_BINDINGS = {
  close: "usemcpkitCloseWindow",
  fit: "usemcpkitFitWindow",
  openLink: "usemcpkitOpenLink",
} as const;

/**
 * The global the CLI's window app defines before the page runs, `{ api, session, request }`: the origin of the form
 * server's API, its session token and the request, which a page served by that server finds in the URL fragment and
 * the request element instead.
 */
export const FORM_WINDOW_CONTEXT = "usemcpkitWindow";

export const CREDENTIALS_FORM_SESSION_HEADER = "X-Usemcpkit-Session";

export const WEB_HOST_API_PREFIX = "api.";
