import { defineTool } from "@usemcpkit/core";

export const usersRolesGetRole = defineTool({
  name: "users:roles:get_role",
  description:
    "Retrieve a role. Returns a single role with its scopes. Set `withUsageCount` to include how many users and projects use the role.",
  input: {
    type: "object",
    properties: {
      roleSlug: {
        type: "string",
        description: "The slug of the role.",
      },
      withUsageCount: {
        type: "string",
        default: "false",
        enum: ["true", "false"],
      },
    },
    required: ["roleSlug"],
  },
  request: {
    method: "GET",
    path: "/roles/{roleSlug}",
    query: ["withUsageCount"],
  },
});
