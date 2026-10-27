import { defineTool } from "@usemcpkit/core";

export const hierarchyFoldersGetFolders = defineTool({
  name: "hierarchy:folders:get_folders",
  description:
    "Get Folders. View the Folders in a Space. Subfolders are returned in the same flat list as top-level Folders, each with a `parent_folder` field holding the ID of the Folder it is nested inside of. This endpoint does not nest them; to get a Folder's subfolder tree, use Get Folder with `include_subfolders=true`.",
  input: {
    type: "object",
    properties: {
      space_id: {
        type: "number",
      },
      archived: {
        type: "boolean",
      },
    },
    required: ["space_id"],
  },
  request: {
    method: "GET",
    path: "/v2/space/{space_id}/folder",
    query: ["archived"],
  },
});
