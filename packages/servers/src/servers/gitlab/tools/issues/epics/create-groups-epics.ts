import { defineTool } from "@usemcpkit/core";

export const issuesEpicsCreateGroupsEpics = defineTool({
  name: "issues:epics:create_groups_epics",
  description: "Create a new epic. Creates a new epic",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      title: {
        type: "string",
        description: "Title of the epic.",
      },
      description: {
        type: "string",
        description: "Description of the epic.",
      },
      color: {
        type: "string",
        description: "Color of the epic.",
      },
      confidential: {
        type: "boolean",
        description: "If `true`, the epic is confidential.",
      },
      created_at: {
        type: "string",
        description: "Date and time the epic was created. Available only for administrators and project owners.",
      },
      start_date: {
        type: "string",
        description: "Start date of the epic. Deprecated. Use `start_date_fixed` instead.",
      },
      start_date_fixed: {
        type: "string",
        description: "Start date of the epic.",
      },
      start_date_is_fixed: {
        type: "boolean",
        description:
          "If `true`, sources the start date from the `start_date_fixed` field instead of the issue milestones.",
      },
      end_date: {
        type: "string",
        description: "Due date of the epic. Deprecated. Use `due_date_fixed` instead.",
      },
      due_date_fixed: {
        type: "string",
        description: "Due date of the epic.",
      },
      due_date_is_fixed: {
        type: "boolean",
        description: "If `true`, sources the due date from the `due_date_fixed` field instead of the issue milestones.",
      },
      labels: {
        type: "array",
        description:
          "Comma-separated list of label names. Label names from the epic group or a parent group can be used.",
        items: {
          type: "string",
        },
      },
      parent_id: {
        type: "integer",
        description: "ID of the parent epic.",
      },
    },
    required: ["id", "title"],
  },
  request: {
    method: "POST",
    path: "/groups/{id}/(-/)epics",
    body: [
      "title",
      "description",
      "color",
      "confidential",
      "created_at",
      "start_date",
      "start_date_fixed",
      "start_date_is_fixed",
      "end_date",
      "due_date_fixed",
      "due_date_is_fixed",
      "labels",
      "parent_id",
    ],
  },
});
