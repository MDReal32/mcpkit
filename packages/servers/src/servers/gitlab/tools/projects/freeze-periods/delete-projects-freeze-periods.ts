import { defineTool } from "@usemcpkit/core";

export const projectsFreezePeriodsDeleteProjectsFreezePeriods = defineTool({
  name: "projects:freeze_periods:delete_projects_freeze_periods",
  description:
    "Delete a freeze period. Deletes a freeze period for a specified `freeze_period_id`. You must have the Maintainer or Owner role for the project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      freeze_period_id: {
        type: "integer",
        description: "ID of the freeze period.",
      },
    },
    required: ["id", "freeze_period_id"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/freeze_periods/{freeze_period_id}",
  },
});
