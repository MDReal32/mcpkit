import { defineTool } from "@usemcpkit/core";

export const collaborationFilterSharingSetDefaultShareScope = defineTool({
  name: "collaboration:filter_sharing:set_default_share_scope",
  description: "Set default share scope. Sets the default sharing for new filters and dashboards for a user.",
  input: {
    type: "object",
    properties: {
      scope: {
        type: "string",
        description: "The scope of the default sharing for new filters and dashboards:",
        enum: ["GLOBAL", "AUTHENTICATED", "PRIVATE"],
      },
    },
    required: ["scope"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/filter/defaultShareScope",
    body: ["scope"],
  },
});
