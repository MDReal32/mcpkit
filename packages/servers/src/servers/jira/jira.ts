import { defineServer } from "@usemcpkit/core";
import { JIRA_BASE, JIRA_SOURCES } from "./const";
import { getAttachmentContent } from "./tools/get-attachment-content";
import { getAttachmentThumbnail } from "./tools/get-attachment-thumbnail";

export const jira = defineServer({
  ...JIRA_BASE,
  name: "jira",
  description:
    "Jira REST API of Jira Cloud or of the Data Center release the host runs: issues, projects, users, workflows, fields, dashboards and filters, administration and Jira Software boards and sprints. Tools are named after their endpoint, '<path>:<method>' (rest/api/2/issue/{issueIdOrKey}:get, rest/agile/1.0/board:get); the /rest/api/2 endpoints take plain-text fields.",
  openapi: { sources: JIRA_SOURCES },
  tools: [getAttachmentContent, getAttachmentThumbnail],
});
