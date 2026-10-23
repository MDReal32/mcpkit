import { defineTool } from "@usemcpkit/core";

export const cloudTasksGetTasks = defineTool({
  name: "cloud:tasks:get_tasks",
  description:
    "[Cloud] Get tasks. Returns all tasks. The number of results is limited by the `limit` parameter and additional results (if available) will be available through the `next` URL present in the `Link` response header.",
  input: {
    type: "object",
    properties: {
      body_format: {
        type: "string",
        description:
          "The content format types to be returned in the `body` field of the response. If available, the representation will be available under a response field of the same name under the `body` field.",
        enum: ["storage", "atlas_doc_format"],
      },
      include_blank_tasks: {
        type: "boolean",
        description: "Specifies whether to include blank tasks in the response. Defaults to `true`.",
      },
      status: {
        type: "string",
        enum: ["complete", "incomplete"],
        description: "Filters on the status of the task.",
      },
      task_id: {
        type: "string",
        description: "Filters on task ID. Multiple IDs can be specified. (comma-separated)",
      },
      space_id: {
        type: "string",
        description: "Filters on the space ID of the task. Multiple IDs can be specified. (comma-separated)",
      },
      page_id: {
        type: "string",
        description:
          "Filters on the page ID of the task. Multiple IDs can be specified. Note - page and blog post filters can be used in conjunction. (comma-separated)",
      },
      blogpost_id: {
        type: "string",
        description:
          "Filters on the blog post ID of the task. Multiple IDs can be specified. Note - page and blog post filters can be used in conjunction. (comma-separated)",
      },
      created_by: {
        type: "string",
        description:
          "Filters on the Account ID of the user who created this task. Multiple IDs can be specified. (comma-separated)",
      },
      assigned_to: {
        type: "string",
        description:
          "Filters on the Account ID of the user to whom this task is assigned. Multiple IDs can be specified. (comma-separated)",
      },
      completed_by: {
        type: "string",
        description:
          "Filters on the Account ID of the user who completed this task. Multiple IDs can be specified. (comma-separated)",
      },
      created_at_from: {
        type: "integer",
        description:
          "Filters on start of date-time range of task based on creation date (inclusive). Input is epoch time in milliseconds.",
      },
      created_at_to: {
        type: "integer",
        description:
          "Filters on end of date-time range of task based on creation date (inclusive). Input is epoch time in milliseconds.",
      },
      due_at_from: {
        type: "integer",
        description:
          "Filters on start of date-time range of task based on due date (inclusive). Input is epoch time in milliseconds.",
      },
      due_at_to: {
        type: "integer",
        description:
          "Filters on end of date-time range of task based on due date (inclusive). Input is epoch time in milliseconds.",
      },
      completed_at_from: {
        type: "integer",
        description:
          "Filters on start of date-time range of task based on completion date (inclusive). Input is epoch time in milliseconds.",
      },
      completed_at_to: {
        type: "integer",
        description:
          "Filters on end of date-time range of task based on completion date (inclusive). Input is epoch time in milliseconds.",
      },
      cursor: {
        type: "string",
        description:
          "Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the relative URL in the `Link` header to retrieve the `next` set of results.",
      },
      limit: {
        type: "integer",
        description:
          "Maximum number of tasks per result to return. If more results exist, use the `Link` header to retrieve a relative URL that will return the next set of results.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/tasks",
    query: {
      "body-format": "body_format",
      "include-blank-tasks": "include_blank_tasks",
      status: "status",
      "task-id": "task_id",
      "space-id": "space_id",
      "page-id": "page_id",
      "blogpost-id": "blogpost_id",
      "created-by": "created_by",
      "assigned-to": "assigned_to",
      "completed-by": "completed_by",
      "created-at-from": "created_at_from",
      "created-at-to": "created_at_to",
      "due-at-from": "due_at_from",
      "due-at-to": "due_at_to",
      "completed-at-from": "completed_at_from",
      "completed-at-to": "completed_at_to",
      cursor: "cursor",
      limit: "limit",
    },
  },
});
