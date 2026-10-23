import { defineTool } from "@usemcpkit/core";

export const cloudFoldersGetFolderAncestors = defineTool({
  name: "cloud:folders:get_folder_ancestors",
  description:
    "[Cloud] Get all ancestors of folder. Returns all ancestors for a given folder by ID in top-to-bottom order (that is, the highest ancestor is the first item in the response payload). The number of results is limited by the `limit` parameter and additional results (if available) will be available by calling this endpoint with the ID of first ancestor in the response payload.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the folder.",
      },
      limit: {
        type: "integer",
        description:
          "Maximum number of items per result to return. If more results exist, call the endpoint with the highest ancestor's ID to fetch the next set of results.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/folders/{id}/ancestors",
    query: ["limit"],
  },
});
