import { defineTool } from "@usemcpkit/core";

export const usersUsersListUsers = defineTool({
  name: "users:users:list_users",
  description:
    "List all users. Lists all users on the instance. This endpoint supports keyset pagination. In GitLab 17.0 and later, keyset pagination is used by default.",
  input: {
    type: "object",
    properties: {
      username: {
        type: "string",
        description: "Return a single user with the specified username.",
      },
      extern_uid: {
        type: "string",
        description:
          "Return a single user with the specified external authentication provider UID. Use with `provider`. Administrators only. All or none of `extern_uid`, `provider` must be provided.",
      },
      public_email: {
        type: "string",
        description: "Return a single user with the specified public email.",
      },
      provider: {
        type: "string",
        description:
          "Name of the external authentication provider. All or none of `extern_uid`, `provider` must be provided.",
      },
      search: {
        type: "string",
        description: "Search for users by name, username, or public email.",
      },
      active: {
        type: "boolean",
        default: false,
        description: "If `true`, returns only active users.",
      },
      humans: {
        type: "boolean",
        default: false,
        description: "If `true`, returns only regular users that are not bot or internal users.",
      },
      external: {
        type: "boolean",
        default: false,
        description: "If `true`, returns only external users.",
      },
      blocked: {
        type: "boolean",
        default: false,
        description: "If `true`, returns only blocked users.",
      },
      created_after: {
        type: "string",
        description: "Return users created on or after the specified time.",
      },
      created_before: {
        type: "string",
        description: "Return users created on or before the specified time.",
      },
      without_projects: {
        type: "boolean",
        default: false,
        description: "If `true`, returns only users that do not have any projects.",
      },
      without_project_bots: {
        type: "boolean",
        default: false,
        description: "If `true`, excludes project bot users from the results.",
      },
      admins: {
        type: "boolean",
        default: false,
        description: "If `true`, returns only administrators.",
      },
      two_factor: {
        type: "string",
        description: "Filter users by Two-factor authentication.",
      },
      exclude_active: {
        type: "boolean",
        default: false,
        description: "If `true`, returns only users that are not active.",
      },
      exclude_external: {
        type: "boolean",
        default: false,
        description: "If `true`, returns only users that are not external.",
      },
      exclude_humans: {
        type: "boolean",
        default: false,
        description: "If `true`, returns only bot or internal users.",
      },
      exclude_internal: {
        type: "boolean",
        default: false,
        description: "If `true`, returns only users that are not internal.",
      },
      order_by: {
        type: "string",
        enum: ["id", "name", "username", "created_at", "updated_at"],
        description: "Sort results by the specified field.",
      },
      sort: {
        type: "string",
        enum: ["asc", "desc"],
        description: "Sort results in ascending or descending order.",
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
      with_custom_attributes: {
        type: "boolean",
        default: false,
        description: "If `true`, includes custom attributes in the response. Administrators only.",
      },
      custom_attributes: {
        type: "object",
        description:
          "Filter by custom attributes that match all of the specified key and value pairs. Administrators only.",
      },
      skip_ldap: {
        type: "boolean",
        default: false,
        description: "If `true`, excludes LDAP users from the results.",
      },
      auditors: {
        type: "boolean",
        default: false,
        description: "If `true`, returns only auditor users.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/users",
    query: [
      "username",
      "extern_uid",
      "public_email",
      "provider",
      "search",
      "active",
      "humans",
      "external",
      "blocked",
      "created_after",
      "created_before",
      "without_projects",
      "without_project_bots",
      "admins",
      "two_factor",
      "exclude_active",
      "exclude_external",
      "exclude_humans",
      "exclude_internal",
      "order_by",
      "sort",
      "page",
      "per_page",
      "with_custom_attributes",
      "custom_attributes",
      "skip_ldap",
      "auditors",
    ],
  },
});
