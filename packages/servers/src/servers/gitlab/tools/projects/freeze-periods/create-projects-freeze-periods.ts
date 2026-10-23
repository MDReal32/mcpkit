import { defineTool } from "@usemcpkit/core";

export const projectsFreezePeriodsCreateProjectsFreezePeriods = defineTool({
  name: "projects:freeze_periods:create_projects_freeze_periods",
  description:
    "Create a freeze period. Creates a freeze period for a specified project. You must have the Maintainer or Owner role for the project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
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
    required: ["id", "freeze_start", "freeze_end"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/freeze_periods",
    body: ["freeze_start", "freeze_end", "cron_timezone"],
  },
});
