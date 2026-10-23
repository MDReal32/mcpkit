import { defineTool } from "@usemcpkit/core";

export const ciCiRunnersDeleteRunners = defineTool({
  name: "ci:ci_runners:delete_runners",
  description: "Delete a registered runner. Deletes a specified registered runner.",
  input: {
    type: "object",
    properties: {
      token: {
        type: "string",
        description: "Authentication token of the runner.",
      },
    },
    required: ["token"],
  },
  request: {
    method: "DELETE",
    path: "/runners",
    query: ["token"],
  },
});
