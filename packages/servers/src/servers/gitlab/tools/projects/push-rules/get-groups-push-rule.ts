import { defineTool } from "@usemcpkit/core";

export const projectsPushRulesGetGroupsPushRule = defineTool({
  name: "projects:push_rules:get_groups_push_rule",
  description: "Retrieve the push rules of a group. Retrieves the push rules of a specified group.",
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
    method: "GET",
    path: "/groups/{id}/push_rule",
  },
});
