import { defineTool } from "@usemcpkit/core";

export const cloudV1ContentDeleteContentVersion = defineTool({
  name: "cloud_v1:content:delete_content_version",
  description:
    "[Cloud v1] Delete content version. Delete a historical version. This does not delete the changes made to the content in that version, rather the changes for the deleted version are rolled up into the next version. Note, you cannot delete the current version.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the content that the version will be deleted from.",
      },
      versionNumber: {
        type: "integer",
        description: "The number of the version to be deleted. The version number starts from 1 up to current version.",
      },
    },
    required: ["id", "versionNumber"],
  },
  request: {
    method: "DELETE",
    path: "/wiki/rest/api/content/{id}/version/{versionNumber}",
  },
});
