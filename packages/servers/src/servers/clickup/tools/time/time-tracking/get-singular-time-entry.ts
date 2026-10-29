import { defineTool } from "@usemcpkit/core";

export const timeTimeTrackingGetSingularTimeEntry = defineTool({
  name: "time:time_tracking:get_singular_time_entry",
  description:
    "Get singular time entry. View a single time entry. \\ \\ ***Note:** A time entry that has a negative duration means that timer is currently running for that user.*",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "number",
        description: "Workspace ID",
      },
      timer_id: {
        type: "string",
        description:
          "The ID of a time entry. \\ \\ This can be found using the Get Time Entries Within a Date Range endpoint.",
      },
      include_task_tags: {
        type: "boolean",
        description: "Include task tags in the response for time entries associated with tasks.",
      },
      include_location_names: {
        type: "boolean",
        description:
          "Include the names of the List, Folder, and Space along with `list_id`,`folder_id`, and `space_id`.",
      },
      include_approval_history: {
        type: "boolean",
        description: "Include the history of the approval for the time entry.",
      },
      include_approval_details: {
        type: "boolean",
        description: "Include the details of the approval for the time entry.",
      },
    },
    required: ["team_id", "timer_id"],
  },
  request: {
    method: "GET",
    path: "/v2/team/{team_id}/time_entries/{timer_id}",
    query: ["include_task_tags", "include_location_names", "include_approval_history", "include_approval_details"],
  },
});
