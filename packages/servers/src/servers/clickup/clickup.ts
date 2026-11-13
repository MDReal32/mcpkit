import { defineServer } from "@usemcpkit/core";
import { CLICKUP_BASE, CLICKUP_SOURCES } from "./const";

export const clickup = defineServer({
  ...CLICKUP_BASE,
  name: "clickup",
  description:
    "ClickUp REST API (v2 and v3): tasks, checklists, comments and custom fields, the Workspace hierarchy (spaces, folders, lists, views), time tracking, goals, users and guests, chat, docs, webhooks and audit logs. Tools are named after their endpoint, '<path>:<method>' (api/v2/task/{task_id}:get). The v2 endpoints call the Workspace id `team_id`; list the Workspaces with api/v2/team:get.",
  openapi: { sources: CLICKUP_SOURCES },
  tools: [],
});
