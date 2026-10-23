import { defineTool } from "@usemcpkit/core";

export const datacenterSpaceDelete = defineTool({
  name: "datacenter:space:delete",
  description:
    "[Data Center] Delete Space. Deletes a Space. The space is deleted in a long running task, so the space cannot be considered deleted when this resource returns. Clients can follow the status link in the response and poll it until the task completes.",
  input: {
    type: "object",
    properties: {
      spaceKey: {
        type: "string",
        description: "the key of the space to update.",
      },
    },
    required: ["spaceKey"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/space/{spaceKey}",
  },
});
