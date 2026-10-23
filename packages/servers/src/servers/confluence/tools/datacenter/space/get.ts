import { defineTool } from "@usemcpkit/core";

export const datacenterSpaceGet = defineTool({
  name: "datacenter:space:get",
  description: "[Data Center] Get space. Returns information about a space.",
  input: {
    type: "object",
    properties: {
      spaceKey: {
        type: "string",
        description: "the key of the space to update.",
      },
      xoauth_requestor_id: {
        type: "string",
      },
      expand: {
        type: "string",
        description: "a comma separated list of properties to expand on the space.",
      },
    },
    required: ["spaceKey"],
  },
  request: {
    method: "GET",
    path: "/rest/api/space/{spaceKey}",
    query: ["xoauth_requestor_id", "expand"],
  },
});
