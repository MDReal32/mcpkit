import { defineTool } from "@usemcpkit/core";

export const docsDocsSearchForDocs = defineTool({
  name: "docs:docs:search_for_docs",
  description:
    "Search for Docs. View the Docs in your Workspace. You can only view information of Docs you can access.",
  input: {
    type: "object",
    properties: {
      workspace_id: {
        type: "number",
        description: "The ID of the Workspace.",
      },
      id: {
        type: "string",
        description: "Filter results to Docs created by the user with the given Doc ID.",
      },
      creator: {
        type: "number",
        description: "Filter results to Docs created by the user with the given user ID.",
      },
      deleted: {
        type: "boolean",
        default: false,
        description: "Filter results to return deleted Docs.",
      },
      archived: {
        type: "boolean",
        default: false,
        description: "Filter results to return archived Docs.",
      },
      parent_id: {
        type: "string",
        description: "Filter results to children of a parent Doc with the given parent Doc ID.",
      },
      parent_type: {
        type: "string",
        enum: ["4", "5", "6", "7", "12", "SPACE", "FOLDER", "LIST", "EVERYTHING", "WORKSPACE"],
        description:
          "Filter results to children of the given parent Doc type. For example, `SPACE`, `FOLDER`, `LIST`, `EVERYTHING`, `WORKSPACE`.",
      },
      limit: {
        type: "number",
        default: 50,
        description: "The maximum number of results to fetch for this page.",
      },
      cursor: {
        type: "string",
        description: "The cursor to use to fetch the next page of results.",
      },
      next_cursor: {
        type: "string",
        description: "The cursor to use to fetch the next page of results. [deprecated]",
      },
    },
    required: ["workspace_id"],
  },
  request: {
    method: "GET",
    path: "/v3/workspaces/{workspace_id}/docs",
    query: ["id", "creator", "deleted", "archived", "parent_id", "parent_type", "limit", "cursor", "next_cursor"],
  },
});
