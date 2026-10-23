import { defineTool } from "@usemcpkit/core";

export const cloudSpacePermissionsGenerateSpacePermissionCombinations = defineTool({
  name: "cloud:space_permissions:generate_space_permission_combinations",
  description:
    "[Cloud] Generate space permission combinations. Submits a task to refresh the space permission combinations in the database, which identifies all unique permission combinations across the site. This provides permission combination IDs that can be used with the assign-roles and remove-access endpoints.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "POST",
    path: "/wiki/api/v2/space-permissions/transition/combinations",
  },
});
