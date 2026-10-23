import { defineTool } from "@usemcpkit/core";

export const ciRunnersListRunnersManagers = defineTool({
  name: "ci:runners:list_runners_managers",
  description: "List all managers for a runner. List all managers for a specified runner.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the runner.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/runners/{id}/managers",
  },
});
