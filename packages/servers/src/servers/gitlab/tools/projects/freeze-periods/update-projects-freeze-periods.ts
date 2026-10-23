import { defineTool } from "@usemcpkit/core";

export const projectsFreezePeriodsUpdateProjectsFreezePeriods = defineTool({
  name: "projects:freeze_periods:update_projects_freeze_periods",
  description:
    "Update a freeze period. Updates a freeze period for a specified `freeze_period_id`. You must have the Maintainer or Owner role for the project.",
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
      freeze_start: {
        type: "string",
        description: "Start of the freeze period in cron format.",
      },
      freeze_end: {
        type: "string",
        description: "End of the freeze period in cron format.",
      },
      cron_timezone: {
        type: "string",
        description: "Time zone for the cron fields.",
      },
    },
    required: ["id", "freeze_period_id"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/freeze_periods/{freeze_period_id}",
    body: ["freeze_start", "freeze_end", "cron_timezone"],
  },
});
