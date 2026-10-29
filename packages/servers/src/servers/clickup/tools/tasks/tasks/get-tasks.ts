import { defineTool } from "@usemcpkit/core";

export const tasksTasksGetTasks = defineTool({
  name: "tasks:tasks:get_tasks",
  description:
    "Get Tasks. View the tasks in a List. Responses are limited to 100 tasks per page. You can only view task information of tasks you can access. \\ \\ This endpoint only includes tasks where the specified `list_id` is their home List. Tasks added to the `list_id` with a different home List are not included in the response by default. To include tasks that exist in multiple lists, use the `include_timl` parameter…",
  input: {
    type: "object",
    properties: {
      list_id: {
        type: "number",
        description:
          "To find the list_id: \\ 1. In the Sidebar, hover over the List and click the **ellipsis ...** menu. \\ 2. Select **Copy link.** \\ 3. Use the copied URL to find the list_id. The list_id is the number that follows /li in the URL.",
      },
      archived: {
        type: "boolean",
      },
      include_markdown_description: {
        type: "boolean",
        description: "To return task descriptions in Markdown format, use `?include_markdown_description=true`.",
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
      statuses: {
        type: "array",
        items: {
          type: "string",
        },
        description:
          "Filter by statuses. To include closed tasks, use the `include_closed` parameter. \\ \\ For example: \\ \\ `?statuses[]=to%20do&statuses[]=in%20progress`",
      },
      include_closed: {
        type: "boolean",
        description:
          "Include or excluse closed tasks. By default, they are excluded.\\ \\ To include closed tasks, use `include_closed: true`.",
      },
      include_timl: {
        type: "boolean",
        description:
          "Include Tasks in Multiple Lists. By default, tasks that exist in multiple lists are excluded from the response.\\ \\ To include tasks that exist in multiple lists, use `include_timl: true`.",
      },
      assignees: {
        type: "array",
        items: {
          type: "string",
        },
        description: "Filter by Assignees. For example: \\ \\ `?assignees[]=1234&assignees[]=5678`",
      },
      watchers: {
        type: "array",
        items: {
          type: "string",
        },
        description: "Filter by watchers.",
      },
      tags: {
        type: "array",
        items: {
          type: "string",
        },
        description: "Filter by tags. For example: \\ \\ `?tags[]=tag1&tags[]=this%20tag`",
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
          'Include tasks with specific values in one or more Custom Fields. Custom Relationships are included.\\ \\ For example: `?custom_fields=[{"field_id":"abcdefghi12345678","operator":"=","value":"1234"},{"field_id":"jklmnop123456","operator":"<","value":"5"}]`\\ \\ Only set Custom Field values display in the `value` property of the `custom_fields` parameter. If you want to include tasks with specific valu…',
      },
      custom_field: {
        type: "string",
        description:
          "Include tasks with specific values in only one Custom Field. This Custom Field can be a Custom Relationship.",
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
    required: ["list_id"],
  },
  request: {
    method: "GET",
    path: "/v2/list/{list_id}/task",
    query: {
      archived: "archived",
      include_markdown_description: "include_markdown_description",
      page: "page",
      order_by: "order_by",
      reverse: "reverse",
      subtasks: "subtasks",
      "statuses[]": "statuses",
      include_closed: "include_closed",
      include_timl: "include_timl",
      "assignees[]": "assignees",
      "watchers[]": "watchers",
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
      custom_field: "custom_field",
      "custom_items[]": "custom_items",
    },
  },
});
