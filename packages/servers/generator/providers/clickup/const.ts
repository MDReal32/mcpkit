import { DEFAULT_SCHEMA_OPTIONS } from "../../utils/schema/const";
import type { SchemaOptions } from "../../utils/types/schema-options";

export const SPEC_URLS = [
  "https://developer.clickup.com/openapi/clickup-api-v2-reference.json",
  "https://developer.clickup.com/openapi/ClickUp_PUBLIC_API_V3.yaml",
];

/** The server's base URL ends in `/api`: v2 paths are relative to it, v3 paths repeat it. */
export const API_PATH_PREFIX = "/api";

export const SCHEMA_OPTIONS: SchemaOptions = { ...DEFAULT_SCHEMA_OPTIONS, keepsExplodedArrays: true };

/** Array filters ClickUp reads only as `<name>[]=…`, which the v2 spec declares without the brackets on some endpoints. */
export const BRACKETED_QUERY_PARAMETERS = ["statuses", "assignees", "watchers", "tags", "custom_items"];

/** Query parameters the spec declares as arrays whose value is one JSON-encoded filter. */
export const JSON_QUERY_PARAMETERS = ["custom_fields", "custom_field"];

export const EXCLUDED_OPERATIONS: Record<string, string> = {
  GetAccessToken: "OAuth authorization code exchange, made by the app that owns the client secret",
};

export const SERVER_GROUPS = [
  {
    name: "tasks",
    categories: [
      "Tasks",
      "Task Checklists",
      "Task Relationships",
      "Comments",
      "Attachments",
      "Custom Fields",
      "Tags",
      "Custom Task Types",
      "Members",
    ],
  },
  {
    name: "hierarchy",
    categories: ["Workspaces", "Spaces", "Folders", "Lists", "Views", "Shared Hierarchy", "Templates"],
  },
  {
    name: "time",
    categories: ["Time Tracking", "Time Tracking (Legacy)"],
  },
  {
    name: "goals",
    categories: ["Goals"],
  },
  {
    name: "users",
    categories: ["Authorization", "Users", "Guests", "User Groups", "Roles"],
  },
  {
    name: "chat",
    categories: ["Chat"],
  },
  {
    name: "docs",
    categories: ["Docs"],
  },
  {
    name: "admin",
    categories: ["Webhooks", "Acls", "Auditlogs"],
  },
];

export const SERVER_NAME = "clickup";

export const SERVER_DESCRIPTION =
  "ClickUp REST API (v2 and v3): tasks, checklists, comments and custom fields, the Workspace hierarchy (spaces, folders, lists, views), time tracking, goals, users and guests, chat, docs, webhooks and audit logs. Tools are named '<group>:<resource>:<action>'. The v2 endpoints call the Workspace id `team_id`; list the Workspaces with hierarchy:workspaces:get_authorized_workspaces.";
