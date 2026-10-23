import { defineTool } from "@usemcpkit/core";

export const collaborationPlansUpdatePlan = defineTool({
  name: "collaboration:plans:update_plan",
  description: "Update plan. Updates any of the following details of a plan using JSON Patch.",
  input: {
    type: "object",
    properties: {
      planId: {
        type: "integer",
        description: "The ID of the plan.",
      },
      useGroupId: {
        type: "boolean",
        default: false,
        description: "Whether to accept group IDs instead of group names. Group names are deprecated.",
      },
      body: {
        type: "object",
      },
    },
    required: ["planId", "body"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/plans/plan/{planId}",
    query: ["useGroupId"],
    bodyArg: "body",
    contentType: "application/json-patch+json",
  },
});
