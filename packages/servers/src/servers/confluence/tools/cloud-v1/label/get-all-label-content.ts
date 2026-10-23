import { defineTool } from "@usemcpkit/core";

export const cloudV1LabelGetAllLabelContent = defineTool({
  name: "cloud_v1:label:get_all_label_content",
  description:
    "[Cloud v1] Get label information. Returns label information and a list of contents associated with the label.",
  input: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Name of the label to query.",
      },
      type: {
        type: "string",
        enum: ["page", "blogpost", "attachment", "page_template"],
        description: "The type of contents that are to be returned.",
      },
      start: {
        type: "integer",
        description: "The starting offset for the results.",
      },
      limit: {
        type: "integer",
        description: "The number of results to be returned.",
      },
    },
    required: ["name"],
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/label",
    query: ["name", "type", "start", "limit"],
  },
});
