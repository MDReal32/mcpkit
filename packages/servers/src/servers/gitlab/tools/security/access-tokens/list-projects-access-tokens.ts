import { defineTool } from "@usemcpkit/core";

export const securityAccessTokensListProjectsAccessTokens = defineTool({
  name: "security:access_tokens:list_projects_access_tokens",
  description: "List all project access tokens. Lists all project access tokens for a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
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
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/access_tokens",
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
    ],
  },
});
