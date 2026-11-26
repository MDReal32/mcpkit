import { defineServer } from "@usemcpkit/core";
import { TRELLO_BASE, TRELLO_SOURCES } from "./const";

export const trello = defineServer({
  ...TRELLO_BASE,
  name: "trello",
  description:
    "Trello REST API: boards, lists, cards, checklists, labels, custom fields, members and Workspaces (organizations), enterprises, notifications, search, webhooks and batch reads. Tools are named after their endpoint, '<path>:<method>' (boards/{id}:get, cards/{id}/actions:get). A key and token are sent with every call.",
  openapi: { sources: TRELLO_SOURCES },
  tools: [],
});
