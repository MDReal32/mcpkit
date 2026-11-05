import { defineTool } from "@usemcpkit/core";

export const projectsFoldersListFolders = defineTool({
  name: "projects:folders:list_folders",
  description:
    "Retrieve folders. Retrieve folders within a project. Supports filtering, sorting, field selection, and pagination.",
  input: {
    type: "object",
    properties: {
      projectId: {
        type: "string",
        description: "The ID of the project.",
      },
      filter: {
        type: "string",
        description:
          "JSON-encoded filter object. Supported fields — parentFolderId, name, tags (array of tag names), excludeFolderIdAndDescendants.",
      },
      select: {
        type: "string",
        description:
          "JSON-encoded array of fields to include. Valid fields — id, name, createdAt, updatedAt, project, tags, parentFolder, workflowCount, subFolderCount, path.",
      },
      sortBy: {
        type: "string",
        description: "Sort order for results.",
        enum: ["name:asc", "name:desc", "createdAt:asc", "createdAt:desc", "updatedAt:asc", "updatedAt:desc"],
      },
      skip: {
        type: "string",
        description: "Number of items to skip for pagination. Defaults to 0.",
      },
      take: {
        type: "string",
        description: "Number of items to return. Defaults to 10.",
      },
    },
    required: ["projectId"],
  },
  request: {
    method: "GET",
    path: "/projects/{projectId}/folders",
    query: ["filter", "select", "sortBy", "skip", "take"],
  },
});
