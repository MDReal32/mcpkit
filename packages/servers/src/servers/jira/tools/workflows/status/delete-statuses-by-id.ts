import { defineTool } from "@usemcpkit/core";

export const workflowsStatusDeleteStatusesById = defineTool({
  name: "workflows:status:delete_statuses_by_id",
  description: "Bulk delete Statuses. Deletes statuses by ID.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description:
          "The list of status IDs. To include multiple IDs, provide an ampersand-separated list. For example, id=10000&id=10001. (comma-separated)",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/statuses",
    query: ["id"],
  },
});
