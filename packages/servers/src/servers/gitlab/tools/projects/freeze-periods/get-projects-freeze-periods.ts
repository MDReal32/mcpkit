import { defineTool } from "@usemcpkit/core";

export const projectsFreezePeriodsGetProjectsFreezePeriods = defineTool({
  name: "projects:freeze_periods:get_projects_freeze_periods",
  description:
    "Retrieve a freeze period. Retrieves a freeze period for a specified `freeze_period_id`. You must have the Reporter, Developer, Maintainer, or Owner role for the project.",
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
    method: "GET",
    path: "/projects/{id}/freeze_periods/{freeze_period_id}",
  },
});
