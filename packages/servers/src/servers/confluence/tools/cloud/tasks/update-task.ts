import { defineTool } from "@usemcpkit/core";

export const cloudTasksUpdateTask = defineTool({
  name: "cloud:tasks:update_task",
  description: "[Cloud] Update task. Update a task by id. This endpoint currently only supports updating task status.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description:
          "The ID of the task to be updated. If you don't know the task ID, use Get tasks and filter the results.",
      },
      body_format: {
        type: "string",
        description:
          "The content format types to be returned in the `body` field of the response. If available, the representation will be available under a response field of the same name under the `body` field.",
        enum: ["storage", "atlas_doc_format"],
      },
      body_id: {
        type: "string",
        description: "ID of the task.",
      },
      localId: {
        type: "string",
        description: "Local ID of the task. This ID is local to the corresponding page or blog post.",
      },
      spaceId: {
        type: "string",
        description: "ID of the space the task is in.",
      },
      pageId: {
        type: "string",
        description: "ID of the page the task is in.",
      },
      blogPostId: {
        type: "string",
        description: "ID of the blog post the task is in.",
      },
      status: {
        type: "string",
        description: "Status of the task.",
        enum: ["complete", "incomplete"],
      },
      createdBy: {
        type: "string",
        description: "Account ID of the user who created this task.",
      },
      assignedTo: {
        type: "string",
        description: "Account ID of the user to whom this task is assigned.",
      },
      completedBy: {
        type: "string",
        description: "Account ID of the user who completed this task.",
      },
      createdAt: {
        type: "string",
        description: 'Date and time when the task was created. In format "YYYY-MM-DDTHH:mm:ss.sssZ".',
      },
      updatedAt: {
        type: "string",
        description: 'Date and time when the task was updated. In format "YYYY-MM-DDTHH:mm:ss.sssZ".',
      },
      dueAt: {
        type: "string",
        description: 'Date and time when the task is due. In format "YYYY-MM-DDTHH:mm:ss.sssZ".',
      },
      completedAt: {
        type: "string",
        description: 'Date and time when the task was completed. In format "YYYY-MM-DDTHH:mm:ss.sssZ".',
      },
    },
    required: ["id", "status"],
  },
  request: {
    method: "PUT",
    path: "/wiki/api/v2/tasks/{id}",
    query: {
      "body-format": "body_format",
    },
    body: {
      id: "body_id",
      localId: "localId",
      spaceId: "spaceId",
      pageId: "pageId",
      blogPostId: "blogPostId",
      status: "status",
      createdBy: "createdBy",
      assignedTo: "assignedTo",
      completedBy: "completedBy",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      dueAt: "dueAt",
      completedAt: "completedAt",
    },
  },
});
