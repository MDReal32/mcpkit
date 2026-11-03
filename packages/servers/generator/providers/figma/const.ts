import { DEFAULT_SCHEMA_OPTIONS } from "../../utils/schema/const";
import type { SchemaOptions } from "../../utils/types/schema-options";

export const SPEC_URL = "https://raw.githubusercontent.com/figma/rest-api-spec/main/openapi/openapi.yaml";

export const SCHEMA_OPTIONS: SchemaOptions = DEFAULT_SCHEMA_OPTIONS;

/** The security scheme of a personal access token; an operation that does not list it needs an OAuth app or an organization plan token. */
export const PERSONAL_TOKEN_SCHEME = "PersonalAccessToken";

/** Categories are the tags of the spec; the ones left out only hold operations a personal access token cannot call. */
export const SERVER_GROUPS = [
  {
    name: "files",
    categories: ["Files", "Comments", "Comment Reactions", "Dev Resources", "oEmbed"],
  },
  {
    name: "library",
    categories: ["Components", "Component Sets", "Styles", "Variables", "Library Analytics"],
  },
  {
    name: "projects",
    categories: ["Projects", "Folders"],
  },
  {
    name: "users",
    categories: ["Users", "Payments"],
  },
  {
    name: "webhooks",
    categories: ["Webhooks"],
  },
];

export const SERVER_NAME = "figma";

export const SERVER_DESCRIPTION =
  "Figma REST API: files and their nodes, rendered images and image fills, versions, comments and reactions, dev resources, published components, component sets, styles and variables, library analytics, teams' projects and folders, webhooks and the current user. Tools are named '<group>:<resource>:<action>'. A file key is the part after /design/ in a Figma link, and a node id looks like 1:2 (a link carries it as node-id=1-2). files:files:get_file returns the whole document and can be enormous: prefer files:files:get_file_nodes with ids, or pass depth. Variables need an Enterprise plan; operations that need an OAuth app or an organization token are not included.";
