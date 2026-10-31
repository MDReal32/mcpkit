import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_SCHEMA_OPTIONS } from "../../utils/schema/const";
import type { SchemaOptions } from "../../utils/types/schema-options";

/** Medium publishes no OpenAPI description, so this provider reads the one written by hand next to it. */
export const SPEC_PATH = join(dirname(fileURLToPath(import.meta.url)), "openapi.json");

export const SCHEMA_OPTIONS: SchemaOptions = DEFAULT_SCHEMA_OPTIONS;

/** Each operation's tags are `[group, resource]`; groups are listed in this order. */
export const SERVER_GROUPS = ["account", "publications", "posts", "images"];

/** Every Medium response holds its result under `data`. */
export const RESPONSE_ROOT = "data";

/** The one file part of `images:images:upload_image`. */
export const FILE_PART_NAME = "image";

export const SERVER_NAME = "medium";

export const SERVER_DESCRIPTION =
  "Medium's API (api.medium.com/v1), which Medium has archived and no longer supports: it needs an integration token you already have, since Medium stopped issuing new ones. Get the authenticated user (account:me:get_me), list their publications and a publication's contributors, publish posts as HTML or Markdown to the profile or a publication (as a draft, unlisted or public), and upload an image. The API cannot read, edit or delete posts. Tools are named '<group>:<resource>:<action>'. `posts:posts:create_*` publishes under the token owner's name, so prefer publishStatus draft.";
