import { defineTool } from "@usemcpkit/core";

export const timeTimeTrackingGetTimeEntriesWithinADateRange = defineTool({
  name: "time:time_tracking:get_time_entries_within_a_date_range",
  description:
    "Get time entries within a date range. View time entries filtered by start and end date. \\ \\ By default, this endpoint returns time entries from the last 30 days created by the authenticated user. \\ \\ To retrieve time entries for other users, you must include the `assignee` query parameter. \\ \\ Only one of the following location filters can be included at a time: `space_id`, `folder_id`, `list_id`, or `task_id`. \\ \\ ***Note:** A time…",
  input: {
    type: "object",
    properties: {
      team_Id: {
        type: "number",
        description: "Workspace ID",
      },
      start_date: {
        type: "number",
        description: "Unix time in milliseconds",
      },
      end_date: {
        type: "number",
        description: "Unix time in milliseconds",
      },
      assignee: {
        type: "number",
        description:
          "Filter by `user_id`. For multiple assignees, separate `user_id` using commas.\\ \\ **Example:** `assignee=1234,9876`\\ \\ ***Note:** Only Workspace Owners/Admins have access to do this.*",
      },
      include_task_tags: {
        type: "boolean",
        description: "Include task tags in the response for time entries associated with tasks.",
      },
      include_location_names: {
        type: "boolean",
        description:
          "Include the names of the List, Folder, and Space along with the `list_id`,`folder_id`, and `space_id`.",
      },
      include_approval_history: {
        type: "boolean",
        description:
          "Include the history of the approval for each time entry. Adds status changes, notes, and approvers.",
      },
      include_approval_details: {
        type: "boolean",
        description:
          "Include the details of the approval for each time entry. Adds Approver ID, Approved Time, List of Approvers, and Approval Status.",
      },
      space_id: {
        type: "number",
        description: "Only include time entries associated with tasks in a specific Space.",
      },
      folder_id: {
        type: "number",
        description: "Only include time entries associated with tasks in a specific Folder.",
      },
      list_id: {
        type: "number",
        description: "Only include time entries associated with tasks in a specific List.",
      },
      task_id: {
        type: "string",
        description: "Only include time entries associated with a specific task.",
      },
      custom_task_ids: {
        type: "boolean",
        description: "If you want to reference a task by it's custom task id, this value must be `true`.",
      },
      team_id: {
        type: "number",
        description:
          "When the `custom_task_ids` parameter is set to `true`, the Workspace ID must be provided using the `team_id` parameter. \\ For example: `custom_task_ids=true&team_id=123`.",
      },
      is_billable: {
        type: "boolean",
        description:
          "Include only billable time entries by using a value of `true` or only non-billable time entries by using a value of `false`.\\ \\ For example: `?is_billable=true`.",
      },
    },
    required: ["team_Id"],
  },
  request: {
    method: "GET",
    path: "/v2/team/{team_Id}/time_entries",
    query: [
      "start_date",
      "end_date",
      "assignee",
      "include_task_tags",
      "include_location_names",
      "include_approval_history",
      "include_approval_details",
      "space_id",
      "folder_id",
      "list_id",
      "task_id",
      "custom_task_ids",
      "team_id",
      "is_billable",
    ],
  },
});
