import { defineTool } from "@usemcpkit/core";

export const issuesEpicsUpdateGroupsEpics = defineTool({
  name: "issues:epics:update_groups_epics",
  description: "Update an epic. Updates an epic",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      epic_iid: {
        type: "integer",
        description: "Internal ID of the epic.",
      },
      title: {
        type: "string",
        description:
          "Title of the epic. At least one of `add_labels`, `color`, `confidential`, `description`, `due_date_fixed`, `due_date_is_fixed`, `labels`, `parent_id`, `remove_labels`, `start_date_fixed`, `start_date_is_fixed`, `state_event`, `title`, `start_date`, `end_date` must be provided.",
      },
      color: {
        type: "string",
        description:
          "Color of the epic. At least one of `add_labels`, `color`, `confidential`, `description`, `due_date_fixed`, `due_date_is_fixed`, `labels`, `parent_id`, `remove_labels`, `start_date_fixed`, `start_date_is_fixed`, `state_event`, `title`, `start_date`, `end_date` must be provided.",
      },
      description: {
        type: "string",
        description:
          "Description of the epic. At least one of `add_labels`, `color`, `confidential`, `description`, `due_date_fixed`, `due_date_is_fixed`, `labels`, `parent_id`, `remove_labels`, `start_date_fixed`, `start_date_is_fixed`, `state_event`, `title`, `start_date`, `end_date` must be provided.",
      },
      confidential: {
        type: "boolean",
        description:
          "If `true`, the epic is confidential. At least one of `add_labels`, `color`, `confidential`, `description`, `due_date_fixed`, `due_date_is_fixed`, `labels`, `parent_id`, `remove_labels`, `start_date_fixed`, `start_date_is_fixed`, `state_event`, `title`, `start_date`, `end_date` must be provided.",
      },
      updated_at: {
        type: "string",
        description: "Date and time the epic was updated. Available only for administrators and project owners.",
      },
      start_date: {
        type: "string",
        description:
          "Start date of the epic. Deprecated. Use `start_date_fixed` instead. At least one of `add_labels`, `color`, `confidential`, `description`, `due_date_fixed`, `due_date_is_fixed`, `labels`, `parent_id`, `remove_labels`, `start_date_fixed`, `start_date_is_fixed`, `state_event`, `title`, `start_date`, `end_date` must be provided.",
      },
      start_date_fixed: {
        type: "string",
        description:
          "Start date of the epic. At least one of `add_labels`, `color`, `confidential`, `description`, `due_date_fixed`, `due_date_is_fixed`, `labels`, `parent_id`, `remove_labels`, `start_date_fixed`, `start_date_is_fixed`, `state_event`, `title`, `start_date`, `end_date` must be provided.",
      },
      start_date_is_fixed: {
        type: "boolean",
        description:
          "If `true`, sources the start date from the `start_date_fixed` field instead of the issue milestones. At least one of `add_labels`, `color`, `confidential`, `description`, `due_date_fixed`, `due_date_is_fixed`, `labels`, `parent_id`, `remove_labels`, `start_date_fixed`, `start_date_is_fixed`, `state_event`, `title`, `start_date`, `end_date` must be provided.",
      },
      end_date: {
        type: "string",
        description:
          "Due date of the epic. Deprecated. Use `due_date_fixed` instead. At least one of `add_labels`, `color`, `confidential`, `description`, `due_date_fixed`, `due_date_is_fixed`, `labels`, `parent_id`, `remove_labels`, `start_date_fixed`, `start_date_is_fixed`, `state_event`, `title`, `start_date`, `end_date` must be provided.",
      },
      due_date_fixed: {
        type: "string",
        description:
          "Due date of the epic. At least one of `add_labels`, `color`, `confidential`, `description`, `due_date_fixed`, `due_date_is_fixed`, `labels`, `parent_id`, `remove_labels`, `start_date_fixed`, `start_date_is_fixed`, `state_event`, `title`, `start_date`, `end_date` must be provided.",
      },
      due_date_is_fixed: {
        type: "boolean",
        description:
          "If `true`, sources the due date from the `due_date_fixed` field instead of the issue milestones. At least one of `add_labels`, `color`, `confidential`, `description`, `due_date_fixed`, `due_date_is_fixed`, `labels`, `parent_id`, `remove_labels`, `start_date_fixed`, `start_date_is_fixed`, `state_event`, `title`, `start_date`, `end_date` must be provided.",
      },
      labels: {
        type: "array",
        description:
          "Comma-separated label names for the epic. At least one of `add_labels`, `color`, `confidential`, `description`, `due_date_fixed`, `due_date_is_fixed`, `labels`, `parent_id`, `remove_labels`, `start_date_fixed`, `start_date_is_fixed`, `state_event`, `title`, `start_date`, `end_date` must be provided.",
        items: {
          type: "string",
        },
      },
      add_labels: {
        type: "array",
        description:
          "Comma-separated label names to add to the epic. At least one of `add_labels`, `color`, `confidential`, `description`, `due_date_fixed`, `due_date_is_fixed`, `labels`, `parent_id`, `remove_labels`, `start_date_fixed`, `start_date_is_fixed`, `state_event`, `title`, `start_date`, `end_date` must be provided.",
        items: {
          type: "string",
        },
      },
      remove_labels: {
        type: "array",
        description:
          "Comma-separated label names to remove from the epic. At least one of `add_labels`, `color`, `confidential`, `description`, `due_date_fixed`, `due_date_is_fixed`, `labels`, `parent_id`, `remove_labels`, `start_date_fixed`, `start_date_is_fixed`, `state_event`, `title`, `start_date`, `end_date` must be provided.",
        items: {
          type: "string",
        },
      },
      state_event: {
        type: "string",
        description:
          "Event to change the state of the epic. At least one of `add_labels`, `color`, `confidential`, `description`, `due_date_fixed`, `due_date_is_fixed`, `labels`, `parent_id`, `remove_labels`, `start_date_fixed`, `start_date_is_fixed`, `state_event`, `title`, `start_date`, `end_date` must be provided.",
        enum: ["reopen", "close"],
      },
      parent_id: {
        type: "integer",
        description:
          "ID of the parent epic. At least one of `add_labels`, `color`, `confidential`, `description`, `due_date_fixed`, `due_date_is_fixed`, `labels`, `parent_id`, `remove_labels`, `start_date_fixed`, `start_date_is_fixed`, `state_event`, `title`, `start_date`, `end_date` must be provided.",
      },
    },
    required: ["id", "epic_iid"],
  },
  request: {
    method: "PUT",
    path: "/groups/{id}/(-/)epics/{epic_iid}",
    body: [
      "title",
      "color",
      "description",
      "confidential",
      "updated_at",
      "start_date",
      "start_date_fixed",
      "start_date_is_fixed",
      "end_date",
      "due_date_fixed",
      "due_date_is_fixed",
      "labels",
      "add_labels",
      "remove_labels",
      "state_event",
      "parent_id",
    ],
  },
});
