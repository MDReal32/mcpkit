import { defineTool } from "@usemcpkit/core";

export const cloudV1ContentStatesGetCustomContentStates = defineTool({
  name: "cloud_v1:content_states:get_custom_content_states",
  description: "[Cloud v1] Get Custom Content States. Get custom content states that authenticated user has created.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/content-states",
  },
});
