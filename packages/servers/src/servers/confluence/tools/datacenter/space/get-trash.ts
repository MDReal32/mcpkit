import { defineTool } from "@usemcpkit/core";

export const datacenterSpaceGetTrash = defineTool({
  name: "datacenter:space:get_trash",
  description: "[Data Center] Get trash contents of space. Returns the trash contents in this given space.",
  input: {
    type: "object",
    properties: {
      spaceKey: {
        type: "string",
        description: "the key of the space to update.",
      },
      cursor: {
        type: "string",
        description:
          "the identifier which is used to skip results from a previous query when paginating. Cursor is empty in first request, to move forward or backward use cursor provided in response.",
      },
      expand: {
        type: "string",
        description: "a comma separated list of properties to expand on the space.",
      },
      limit: {
        type: "integer",
        description: "the limit of the number of labels to return, this may be restricted by fixed system limits.",
      },
    },
    required: ["spaceKey"],
  },
  request: {
    method: "GET",
    path: "/rest/api/space/{spaceKey}/trash",
    query: ["cursor", "expand", "limit"],
  },
});
