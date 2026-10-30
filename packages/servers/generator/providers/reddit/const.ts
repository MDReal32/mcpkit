import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_SCHEMA_OPTIONS } from "../../utils/schema/const";
import type { SchemaOptions } from "../../utils/types/schema-options";

/** Reddit publishes no OpenAPI description, so this provider reads the one written by hand next to it. */
export const SPEC_PATH = join(dirname(fileURLToPath(import.meta.url)), "openapi.json");

export const SCHEMA_OPTIONS: SchemaOptions = DEFAULT_SCHEMA_OPTIONS;

/** `raw_json=1` stops Reddit from HTML-escaping `&`, `<` and `>` in titles and bodies. */
export const FIXED_QUERY = { raw_json: 1 };

/** Each operation's tags are `[group, resource]`; groups are listed in this order. */
export const SERVER_GROUPS = ["posts", "subreddits", "users", "account"];

/** A listing holds things under `data.children`; a thing holds its fields under `data`. */
export const LISTING_ROOT = "data.children";

export const THING_DATA = "data";

export const SERVER_NAME = "reddit";

export const SERVER_DESCRIPTION =
  "Reddit's OAuth API (read-only): a subreddit's posts, a post with its comment tree, search for posts and subreddits, subreddit info and rules, user profiles and their posts and comments. Tools are named '<group>:<resource>:<action>'. Posts and comments are identified by fullnames (t3_<id>, t1_<id>); listings page with `after` set to the last item's `name`.";
