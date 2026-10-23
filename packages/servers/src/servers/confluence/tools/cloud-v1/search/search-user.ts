import { defineTool } from "@usemcpkit/core";

export const cloudV1SearchSearchUser = defineTool({
  name: "cloud_v1:search:search_user",
  description:
    "[Cloud v1] Search users. Searches for users using user-specific queries from the Confluence Query Language (CQL).",
  input: {
    type: "object",
    properties: {
      cql: {
        type: "string",
        description:
          "The CQL query to be used for the search. See Advanced Searching using CQL for instructions on how to build a CQL query.",
      },
      start: {
        type: "integer",
        description: "The starting index of the returned users.",
      },
      limit: {
        type: "integer",
        description:
          "The maximum number of user objects to return per page. Note, this may be restricted by fixed system limits.",
      },
      expand: {
        type: "string",
        description: "A multi-value parameter indicating which properties of the user to expand. (comma-separated)",
      },
      sitePermissionTypeFilter: {
        type: "string",
        enum: ["all", "externalCollaborator", "none"],
        description:
          "Filters users by permission type. Use `none` to default to licensed users, `externalCollaborator` for external/guest users, and `all` to include all permission types.",
      },
    },
    required: ["cql"],
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/search/user",
    query: ["cql", "start", "limit", "expand", "sitePermissionTypeFilter"],
    commaQuery: ["expand"],
  },
});
