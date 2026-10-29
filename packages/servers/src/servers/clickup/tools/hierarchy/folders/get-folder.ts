import { defineTool } from "@usemcpkit/core";

export const hierarchyFoldersGetFolder = defineTool({
  name: "hierarchy:folders:get_folder",
  description:
    "Get Folder. View the Lists within a Folder. If the Folder is a subfolder, the response includes a `parent_folder` field with the parent Folder ID.",
  input: {
    type: "object",
    properties: {
      folder_id: {
        type: "number",
      },
      include_subfolders: {
        type: "boolean",
        default: false,
        description:
          "Set to `true` to include the nested subfolder tree in the response as a `folders` array of complete Folder objects. Subfolder support must be enabled for the Workspace.",
      },
    },
    required: ["folder_id"],
  },
  request: {
    method: "GET",
    path: "/v2/folder/{folder_id}",
    query: ["include_subfolders"],
  },
});
