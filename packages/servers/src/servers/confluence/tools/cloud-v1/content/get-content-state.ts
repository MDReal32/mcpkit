import { defineTool } from "@usemcpkit/core";

export const cloudV1ContentGetContentState = defineTool({
  name: "cloud_v1:content:get_content_state",
  description:
    "[Cloud v1] Get content state. Gets the current content state of the draft or current version of content. To specify the draft version, set the parameter status to draft, otherwise archived or current will get the relevant published state. Permissions required: Permission to view the content.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The id of the content whose content state is of interest.",
      },
      status: {
        type: "string",
        enum: ["current", "draft", "archived"],
        description: "Set status to one of [current,draft,archived]. Default value is current.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/content/{id}/state",
    query: ["status"],
  },
});
