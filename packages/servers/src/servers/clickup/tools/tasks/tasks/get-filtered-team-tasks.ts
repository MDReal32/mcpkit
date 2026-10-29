import { defineTool } from "@usemcpkit/core";

export const tasksTasksGetFilteredTeamTasks = defineTool({
  name: "tasks:tasks:get_filtered_team_tasks",
  description:
    "Get Filtered Team Tasks. View the tasks that meet specific criteria from a Workspace. Responses are limited to 100 tasks per page. \\ \\ You can only view task information of tasks you can access. \\ \\ Each task's `custom_fields` array only includes Custom Fields applicable to that task's `custom_item_id`.\\ \\ Our Try It modal currently supports filtering by two or more Lists, Folders, or Spaces. To filter by a single List,…",
  input: {
    type: "object",
    properties: {
      team_Id: {
        type: "number",
        description: "Workspace ID",
      },
      page: {
        type: "integer",
        description: "Page to fetch (starts at 0).",
      },
      order_by: {
        type: "string",
        description:
          "Order by a particular field. By default, tasks are ordered by `created`.\\ \\ Options include: `id`, `created`, `updated`, and `due_date`.",
      },
      reverse: {
        type: "boolean",
        description: "Tasks are displayed in reverse order.",
      },
      subtasks: {
        type: "boolean",
        description: "Include or exclude subtasks. By default, subtasks are excluded.",
      },
      space_ids: {
        type: "array",
        items: {
          type: "string",
        },
        description: "Filter by Spaces. For example: \\ \\ `?space_ids[]=1234&space_ids[]=6789`",
      },
      project_ids: {
        type: "array",
        items: {
          type: "string",
        },
        description: "Filter by Folders. For example: \\ \\ `?project_ids[]=1234&project_ids[]=6789`",
      },
      list_ids: {
        type: "array",
        items: {
          type: "string",
        },
        description: "Filter by Lists. For example: \\ \\ `?list_ids[]=1234&list_ids[]=6789`",
      },
      statuses: {
        type: "array",
        items: {
          type: "string",
        },
        description:
          "Filter by statuses. Use `%20` to represent a space character. To include closed tasks, use the `include_closed` parameter. \\ \\ For example: \\ \\ `?statuses[]=to%20do&statuses[]=in%20progress`",
      },
      include_closed: {
        type: "boolean",
        description:
          "Include or excluse closed tasks. By default, they are excluded.\\ \\ To include closed tasks, use `include_closed: true`.",
      },
      assignees: {
        type: "array",
        items: {
          type: "string",
        },
        description:
          "Filter by Assignees using people's ClickUp user id. For example: \\ \\ `?assignees[]=1234&assignees[]=5678`",
      },
      tags: {
        type: "array",
        items: {
          type: "string",
        },
        description:
          "Filter by tags. User `%20` to represent a space character. For example: \\ \\ `?tags[]=tag1&tags[]=this%20tag`",
      },
      due_date_gt: {
        type: "integer",
        description: "Filter by due date greater than Unix time in milliseconds.",
      },
      due_date_lt: {
        type: "integer",
        description: "Filter by due date less than Unix time in milliseconds.",
      },
      date_created_gt: {
        type: "integer",
        description: "Filter by date created greater than Unix time in milliseconds.",
      },
      date_created_lt: {
        type: "integer",
        description: "Filter by date created less than Unix time in milliseconds.",
      },
      date_updated_gt: {
        type: "integer",
        description: "Filter by date updated greater than Unix time in milliseconds.",
      },
      date_updated_lt: {
        type: "integer",
        description: "Filter by date updated less than Unix time in milliseconds.",
      },
      date_done_gt: {
        type: "integer",
        description: "Filter by date done greater than Unix time in milliseconds.",
      },
      date_done_lt: {
        type: "integer",
        description: "Filter by date done less than Unix time in milliseconds.",
      },
      custom_fields: {
        type: "string",
        description:
          'Include tasks with specific values in one or more Custom Fields. Custom Relationships are included.\\ \\ For example: `?custom_fields=[{"field_id":"abcdefghi12345678","operator":"=","value":"1234"}{"field_id":"jklmnop123456","operator":"<","value":"5"}]`\\ \\ Only set Custom Field values display in the `value` property of the `custom_fields` parameter. The `=` operator isn\'t supported with Label Cust…',
      },
      parent: {
        type: "string",
        description: "Include the parent task ID to return subtasks.",
      },
      include_markdown_description: {
        type: "boolean",
        description: "To return task descriptions in Markdown format, use `?include_markdown_description=true`.",
      },
      custom_items: {
        type: "array",
        items: {
          type: "number",
        },
        description:
          "Filter by custom task types. For example: \\ \\ `?custom_items[]=0&custom_items[]=1300` \\ \\ Including `0` returns tasks. Including `1` returns Milestones. Including any other number returns the custom task type as defined in your Workspace.",
      },
    },
    required: ["team_Id"],
  },
  request: {
    method: "GET",
    path: "/v2/team/{team_Id}/task",
    query: {
      page: "page",
      order_by: "order_by",
      reverse: "reverse",
      subtasks: "subtasks",
      "space_ids[]": "space_ids",
      "project_ids[]": "project_ids",
      "list_ids[]": "list_ids",
      "statuses[]": "statuses",
      include_closed: "include_closed",
      "assignees[]": "assignees",
      "tags[]": "tags",
      due_date_gt: "due_date_gt",
      due_date_lt: "due_date_lt",
      date_created_gt: "date_created_gt",
      date_created_lt: "date_created_lt",
      date_updated_gt: "date_updated_gt",
      date_updated_lt: "date_updated_lt",
      date_done_gt: "date_done_gt",
      date_done_lt: "date_done_lt",
      custom_fields: "custom_fields",
      parent: "parent",
      include_markdown_description: "include_markdown_description",
      "custom_items[]": "custom_items",
    },
  },
});
