import { defineTool } from "@usemcpkit/core";

export const cloudSpacePermissionsListSpacePermissionCombinations = defineTool({
  name: "cloud:space_permissions:list_space_permission_combinations",
  description:
    "[Cloud] List unassigned space permission combinations. Lists the unique unassigned space permission combinations currently present on the tenant. Combinations that already map to a space role are filtered out server-side. Each row carries the decoded set of space permissions and the principal types that currently hold the combination — these inform which `principalType` values are valid to include in the matching bulk role-assignments request.",
  input: {
    type: "object",
    properties: {
      cursor: {
        type: "string",
        description:
          "Opaque cursor returned from a previous page in the `cursor` field of the response. Omit for the first page.",
      },
      limit: {
        type: "integer",
        description:
          "The maximum number of combinations to return per page. Requests outside the supported range return `400`.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/space-permissions/transition/combinations",
    query: ["cursor", "limit"],
  },
});
