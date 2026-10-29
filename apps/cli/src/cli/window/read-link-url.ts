import { WINDOW_LINK_PROTOCOLS } from "./const";

/** The `[url]` the page passes to the open-link binding; undefined unless it is one http(s) URL. */
export const readLinkUrl = (request: string) => {
  const args: unknown = JSON.parse(request);
  const url = Array.isArray(args) ? args[0] : undefined;
  if (typeof url !== "string" || !URL.canParse(url)) {
    return undefined;
  }
  return WINDOW_LINK_PROTOCOLS.includes(new URL(url).protocol) ? url : undefined;
};
