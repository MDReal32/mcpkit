import { defineTool } from "@usemcpkit/core";

export const hierarchyViewsGetFolderViews = defineTool({
  name: "hierarchy:views:get_folder_views",
  description: "Get Folder Views. View the task and page views available for a Folder.",
  input: {
    type: "object",
    properties: {
      folder_id: {
        type: "number",
      },
    },
    required: ["folder_id"],
  },
  request: {
    method: "GET",
    path: "/v2/folder/{folder_id}/view",
  },
});
