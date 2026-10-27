import { defineTool } from "@usemcpkit/core";

export const timeTimeTrackingGetAllTagsFromTimeEntries = defineTool({
  name: "time:time_tracking:get_all_tags_from_time_entries",
  description:
    "Get all tags from time entries. View all the labels that have been applied to time entries in a Workspace.",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "number",
        description: "Workspace ID",
      },
    },
    required: ["team_id"],
  },
  request: {
    method: "GET",
    path: "/v2/team/{team_id}/time_entries/tags",
  },
});
