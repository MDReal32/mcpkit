import { defineTool } from "@usemcpkit/core";

export const timeTimeTrackingRemoveTagsFromTimeEntries = defineTool({
  name: "time:time_tracking:remove_tags_from_time_entries",
  description:
    "Remove tags from time entries. Remove labels from time entries. This does not remove the label from a Workspace.",
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
          },
          required: ["name"],
        },
      },
    },
    required: ["team_id", "time_entry_ids", "tags"],
  },
  request: {
    method: "DELETE",
    path: "/v2/team/{team_id}/time_entries/tags",
    body: ["time_entry_ids", "tags"],
  },
});
