import { defineTool } from "@usemcpkit/core";

export const cloudV1SpaceGetLabelsForSpace = defineTool({
  name: "cloud_v1:space:get_labels_for_space",
  description:
    "[Cloud v1] Get Space Labels. Returns a list of labels associated with a space. Can provide a prefix as well as other filters to select different types of labels.",
  input: {
    type: "object",
    properties: {
      spaceKey: {
        type: "string",
        description: "The key of the space to get labels for.",
      },
      prefix: {
        type: "string",
        enum: ["global", "my", "team"],
        description:
          "Filters the results to labels with the specified prefix. If this parameter is not specified, then labels with any prefix will be returned.",
      },
      start: {
        type: "integer",
        description: "The starting index of the returned labels.",
      },
      limit: {
        type: "integer",
        description:
          "The maximum number of labels to return per page. Note, this may be restricted by fixed system limits.",
      },
    },
    required: ["spaceKey"],
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/space/{spaceKey}/label",
    query: ["prefix", "start", "limit"],
  },
});
