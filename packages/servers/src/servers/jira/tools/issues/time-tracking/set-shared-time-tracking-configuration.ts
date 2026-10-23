import { defineTool } from "@usemcpkit/core";

export const issuesTimeTrackingSetSharedTimeTrackingConfiguration = defineTool({
  name: "issues:time_tracking:set_shared_time_tracking_configuration",
  description: "Set time tracking settings. Sets the time tracking settings.",
  input: {
    type: "object",
    properties: {
      defaultUnit: {
        type: "string",
        description: "The default unit of time applied to logged time.",
        enum: ["minute", "hour", "day", "week"],
      },
      timeFormat: {
        type: "string",
        description: "The format that will appear on an issue's *Time Spent* field.",
        enum: ["pretty", "days", "hours"],
      },
      workingDaysPerWeek: {
        type: "number",
        description: "The number of days in a working week.",
      },
      workingHoursPerDay: {
        type: "number",
        description: "The number of hours in a working day.",
      },
    },
    required: ["defaultUnit", "timeFormat", "workingDaysPerWeek", "workingHoursPerDay"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/configuration/timetracking/options",
    body: ["defaultUnit", "timeFormat", "workingDaysPerWeek", "workingHoursPerDay"],
  },
});
