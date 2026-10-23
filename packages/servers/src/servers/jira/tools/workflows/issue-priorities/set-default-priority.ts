import { defineTool } from "@usemcpkit/core";

export const workflowsIssuePrioritiesSetDefaultPriority = defineTool({
  name: "workflows:issue_priorities:set_default_priority",
  description: "Set default priority. Sets default issue priority.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description:
          "The ID of the new default issue priority. Must be an existing ID or null. Setting this to null erases the default priority setting.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/priority/default",
    body: ["id"],
  },
});
