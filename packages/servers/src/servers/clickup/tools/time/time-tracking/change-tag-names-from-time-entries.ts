import { defineTool } from "@usemcpkit/core";

export const timeTimeTrackingChangeTagNamesFromTimeEntries = defineTool({
  name: "time:time_tracking:change_tag_names_from_time_entries",
  description: "Change tag names from time entries. Rename an time entry label.",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "number",
        description: "Workspace ID",
      },
      name: {
        type: "string",
      },
      new_name: {
        type: "string",
      },
      tag_bg: {
        type: "string",
      },
      tag_fg: {
        type: "string",
      },
    },
    required: ["team_id", "name", "new_name", "tag_bg", "tag_fg"],
  },
  request: {
    method: "PUT",
    path: "/v2/team/{team_id}/time_entries/tags",
    body: ["name", "new_name", "tag_bg", "tag_fg"],
  },
});
