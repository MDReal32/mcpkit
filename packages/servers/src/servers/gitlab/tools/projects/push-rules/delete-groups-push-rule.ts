import { defineTool } from "@usemcpkit/core";

export const projectsPushRulesDeleteGroupsPushRule = defineTool({
  name: "projects:push_rules:delete_groups_push_rule",
  description: "Delete the push rules of a group. Deletes all the push rules of a specified group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/groups/{id}/push_rule",
  },
});
