import { defineTool } from "@usemcpkit/core";
import { JIRA_DATA_CENTER_9 } from "../../const";

export const editIssue = defineTool({
  name: "rest/api/2/issue/{issueIdOrKey}:put",
  description: "Edit an issue's fields: `fields` sets values, `update` runs operations per field.",
  input: {
    type: "object",
    properties: {
      issueIdOrKey: { type: "string", description: "Issue id or key, such as PROJ-123." },
      fields: {
        type: "object",
        description:
          "Field values by field id: project ({ key }), issuetype ({ name } or { id }), summary, description (plain text or wiki markup), assignee ({ name }), priority ({ name }), labels, components ([{ name }]), parent ({ key }) for a sub-task, and customfield_<id> values.",
      },
      update: {
        type: "object",
        description:
          'Operations per field id, such as { labels: [{ add: "x" }], comment: [{ add: { body: "text" } }] }.',
      },
      notifyUsers: { type: "boolean", description: "Whether watchers get an email; true when absent." },
    },
    required: ["issueIdOrKey"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/issue/{issueIdOrKey}",
    query: ["notifyUsers"],
    body: ["fields", "update"],
  },
  applies: JIRA_DATA_CENTER_9,
});
