import { readWindowContext } from "../window/read-window-context";

/** The URL of a form API path: on the server that serves the page it is relative, in the window app it is absolute. */
export const resolveApiUrl = (path: string) => `${readWindowContext()?.api ?? ""}${path}`;
