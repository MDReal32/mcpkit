import { defineTool } from "@usemcpkit/core";

export const projectsHooksDeleteHooksCustomHeaders = defineTool({
  name: "projects:hooks:delete_hooks_custom_headers",
  description: "Delete a custom header. Deletes a custom header from a specified webhook.",
  input: {
    type: "object",
    properties: {
      hook_id: {
        type: "integer",
        description: "ID of the hook.",
      },
      key: {
        type: "string",
        description: "Name of the custom header.",
      },
    },
    required: ["hook_id", "key"],
  },
  request: {
    method: "DELETE",
    path: "/hooks/{hook_id}/custom_headers/{key}",
  },
});
