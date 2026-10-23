import { defineTool } from "@usemcpkit/core";

export const cloudV1ContentGetAvailableContentStates = defineTool({
  name: "cloud_v1:content:get_available_content_states",
  description:
    "[Cloud v1] Gets available content states for content. Gets content states that are available for the content to be set as. Will return all enabled Space Content States. Will only return most the 3 most recently published custom content states to match UI editor list. To get all custom content states, use the /content-states endpoint.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "id of content to get available states for",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/content/{id}/state/available",
  },
});
