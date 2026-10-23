import { defineTool } from "@usemcpkit/core";

export const cloudDatabasesCreateDatabase = defineTool({
  name: "cloud:databases:create_database",
  description: "[Cloud] Create database. Creates a database in the space.",
  input: {
    type: "object",
    properties: {
      private: {
        type: "boolean",
        description:
          "The database will be private. Only the user who creates this database will have permission to view and edit one.",
      },
      spaceId: {
        type: "string",
        description: "ID of the space.",
      },
      title: {
        type: "string",
        description: "Title of the database.",
      },
      parentId: {
        type: "string",
        description: "The parent content ID of the database.",
      },
    },
    required: ["spaceId"],
  },
  request: {
    method: "POST",
    path: "/wiki/api/v2/databases",
    query: ["private"],
    body: ["spaceId", "title", "parentId"],
  },
});
