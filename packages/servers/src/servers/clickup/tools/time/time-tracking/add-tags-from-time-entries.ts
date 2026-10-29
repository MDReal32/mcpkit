import { defineTool } from "@usemcpkit/core";

export const timeTimeTrackingAddTagsFromTimeEntries = defineTool({
  name: "time:time_tracking:add_tags_from_time_entries",
  description: "Add tags from time entries. Add a label to a time entry.",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "number",
        description: "Workspace ID",
      },
      time_entry_ids: {
        type: "array",
        items: {
          type: "string",
        },
      },
      tags: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            tag_fg: {
              type: "string",
            },
            tag_bg: {
              type: "string",
            },
          },
          required: ["name", "tag_fg", "tag_bg"],
        },
      },
    },
    required: ["team_id", "time_entry_ids", "tags"],
  },
  request: {
    method: "POST",
    path: "/v2/team/{team_id}/time_entries/tags",
    body: ["time_entry_ids", "tags"],
  },
});
