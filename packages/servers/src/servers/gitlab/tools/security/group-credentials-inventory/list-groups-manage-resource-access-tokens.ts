import { defineTool } from "@usemcpkit/core";

export const securityGroupCredentialsInventoryListGroupsManageResourceAccessTokens = defineTool({
  name: "security:group_credentials_inventory:list_groups_manage_resource_access_tokens",
  description:
    "List all group and project access tokens for a group. Lists all group and project access tokens associated with a top-level-group. This feature was introduced in GitLab 17.10.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      revoked: {
        type: "boolean",
        description: "If `true`, only returns revoked tokens. If `false`, only returns tokens that are not revoked.",
      },
      state: {
        type: "string",
        enum: ["all", "active", "inactive"],
        description: "Return tokens with the specified state.",
      },
      created_before: {
        type: "string",
        description: "Return tokens created on or before the specified time.",
      },
      created_after: {
        type: "string",
        description: "Return tokens created on or after the specified time.",
      },
      last_used_before: {
        type: "string",
        description: "Return tokens last used on or before the specified time.",
      },
      last_used_after: {
        type: "string",
        description: "Return tokens last used on or after the specified time.",
      },
      expires_before: {
        type: "string",
        description: "Return tokens that expire before the specified date.",
      },
      expires_after: {
        type: "string",
        description: "Return tokens that expire on or after the specified date.",
      },
      search: {
        type: "string",
        description: "Return tokens that include the specified value in their name.",
      },
      sort: {
        type: "string",
        description:
          "Sort results by the specified field and direction. Possible values are `created_asc`, `created_desc`, `expires_asc`, `expires_desc`, `last_used_asc`, `last_used_desc`, `name_asc`, and `name_desc`.",
      },
      page: {
        type: "integer",
        default: 1,
        description: "Page number of results to retrieve.",
      },
      per_page: {
        type: "integer",
        default: 20,
        description: "Number of items to list per page.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/manage/resource_access_tokens",
    query: [
      "revoked",
      "state",
      "created_before",
      "created_after",
      "last_used_before",
      "last_used_after",
      "expires_before",
      "expires_after",
      "search",
      "sort",
      "page",
      "per_page",
    ],
  },
});
