import { slugify } from "../../utils/naming/slugify";
import { SCOPE_SEGMENTS } from "./const";

/**
 * The first literal segment after the category names the resource (`/channels/{channel_id}/messages` → `messages`);
 * a segment naming another top-level resource is skipped while more literal segments follow it, and a file extension
 * is dropped (`widget.png` → `widget`).
 */
export const toResource = (path: string) => {
  const literals = path
    .split("/")
    .filter((segment) => segment !== "" && !segment.startsWith("{") && !segment.startsWith("@"))
    .map((segment) => segment.replace(/\.[a-z]+$/, ""));
  const [category = "", ...rest] = literals;
  const resource = rest.find((segment, index) => !(SCOPE_SEGMENTS.includes(segment) && index < rest.length - 1));
  return slugify(resource ?? category);
};
