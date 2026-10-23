import { defineTool } from "@usemcpkit/core";

export const projectsHooksGetGroupsHooks = defineTool({
  name: "projects:hooks:get_groups_hooks",
  description: "Retrieve a group hook. Retrieves a specified group hook.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      hook_id: {
        type: "integer",
        description: "ID of the group webhook.",
      },
    },
    required: ["id", "hook_id"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/hooks/{hook_id}",
  },
});
