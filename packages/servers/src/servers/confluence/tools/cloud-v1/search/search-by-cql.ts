import { defineTool } from "@usemcpkit/core";

export const cloudV1SearchSearchByCql = defineTool({
  name: "cloud_v1:search:search_by_cql",
  description: "[Cloud v1] Search content. Searches for content using the Confluence Query Language (CQL).",
  input: {
    type: "object",
    properties: {
      cql: {
        type: "string",
        description:
          "The CQL query to be used for the search. See Advanced Searching using CQL for instructions on how to build a CQL query.",
      },
      cqlcontext: {
        type: "string",
        description: "The space, content, and content status to execute the search against.",
      },
      cursor: {
        type: "string",
        description:
          "Pointer to a set of search results, returned as part of the `next` or `prev` URL from the previous search call.",
      },
      next: {
        type: "boolean",
      },
      prev: {
        type: "boolean",
      },
      limit: {
        type: "integer",
        description:
          "The maximum number of content objects to return per page. Note, this may be restricted by fixed system limits.",
      },
      start: {
        type: "integer",
        description: "The start point of the collection to return",
      },
      includeArchivedSpaces: {
        type: "boolean",
        description: "Whether to include content from archived spaces in the results.",
      },
      excludeCurrentSpaces: {
        type: "boolean",
        description: "Whether to exclude current spaces and only show archived spaces.",
      },
      excerpt: {
        type: "string",
        enum: ["highlight", "indexed", "none", "highlight_unescaped", "indexed_unescaped"],
        description: "The excerpt strategy to apply to the result",
      },
      sitePermissionTypeFilter: {
        type: "string",
        enum: ["all", "externalCollaborator", "none"],
        description:
          "Filters users by permission type. Use `none` to default to licensed users, `externalCollaborator` for external/guest users, and `all` to include all permission types.",
      },
      _: {
        type: "integer",
      },
      expand: {
        type: "string",
        description: "(comma-separated)",
      },
    },
    required: ["cql"],
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/search",
    query: [
      "cql",
      "cqlcontext",
      "cursor",
      "next",
      "prev",
      "limit",
      "start",
      "includeArchivedSpaces",
      "excludeCurrentSpaces",
      "excerpt",
      "sitePermissionTypeFilter",
      "_",
      "expand",
    ],
    commaQuery: ["expand"],
  },
});
