import { defineClickupServer } from "../../providers/clickup";
import { clickupTools } from "./tools";

export const clickup = defineClickupServer({
  name: "clickup",
  description:
    "ClickUp REST API (v2 and v3): tasks, checklists, comments and custom fields, the Workspace hierarchy (spaces, folders, lists, views), time tracking, goals, users and guests, chat, docs, webhooks and audit logs. Tools are named '<group>:<resource>:<action>'. The v2 endpoints call the Workspace id `team_id`; list the Workspaces with hierarchy:workspaces:get_authorized_workspaces.",
  tools: clickupTools,
});
