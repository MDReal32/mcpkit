import { defineTool } from "@usemcpkit/core";

export const projectsFoldersDeleteFolder = defineTool({
  name: "projects:folders:delete_folder",
  description:
    "Delete a folder. Delete a folder within a project. When `transferToFolderId` is provided, workflows and sub-folders are moved to the target folder before deletion. When omitted, workflows are moved to the project root and archived, and child folders are deleted.",
  input: {
    type: "object",
    properties: {
      projectId: {
        type: "string",
        description: "The ID of the project.",
      },
      folderId: {
        type: "string",
        description: "The ID of the folder.",
      },
      transferToFolderId: {
        type: "string",
        description: "Optional target folder ID to move workflows and sub-folders into before deleting.",
      },
    },
    required: ["projectId", "folderId"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{projectId}/folders/{folderId}",
    query: ["transferToFolderId"],
  },
});
