import { defineTool } from "@usemcpkit/core";
import { JIRA_DATA_CENTER_9 } from "../../const";

export const createIssue = defineTool({
  name: "rest/api/2/issue:post",
  description: "Create an issue or a sub-task; answers with its id and key.",
  input: {
    type: "object",
    properties: {
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
    },
    required: ["fields"],
  },
  request: { method: "POST", path: "/rest/api/2/issue", body: ["fields", "update"] },
  applies: JIRA_DATA_CENTER_9,
});
