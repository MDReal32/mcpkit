import { defineTool } from "@usemcpkit/core";

export const datacenterLabelGetRelated = defineTool({
  name: "datacenter:label:get_related",
  description:
    "[Data Center] Get related labels. Return a paginated list of labels related to the given label name sorted by frequency of use in descending order. The current process for identifying related labels solely examines global labels, but it may change in the future.",
  input: {
    type: "object",
    properties: {
      labelName: {
        type: "string",
        description: "the name of the label (namespace prefixes permitted).",
      },
      start: {
        type: "integer",
        description: "the start point of the collection to return.",
      },
      limit: {
        type: "integer",
        description: "the maximum number of related labels to return. Default to be 100.",
      },
    },
    required: ["labelName"],
  },
  request: {
    method: "GET",
    path: "/rest/api/label/{labelName}/related",
    query: ["start", "limit"],
  },
});
