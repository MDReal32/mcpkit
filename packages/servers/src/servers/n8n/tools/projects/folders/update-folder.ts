import { defineTool } from "@usemcpkit/core";

export const projectsFoldersUpdateFolder = defineTool({
  name: "projects:folders:update_folder",
  description: "Update a folder. Update folder name or parent folder.",
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
      name: {
        type: "string",
      },
      parentFolderId: {
        type: "string",
        description:
          'ID of the parent folder to move this folder into. Set to "0" to move the folder to the project root.',
      },
    },
    required: ["projectId", "folderId"],
  },
  request: {
    method: "PATCH",
    path: "/projects/{projectId}/folders/{folderId}",
    body: ["name", "parentFolderId"],
  },
});
