import { defineTool } from "@usemcpkit/core";

export const projectsProjectsUpdateProjectsIssues = defineTool({
  name: "projects:projects:update_projects_issues",
  description:
    "Update an issue. Updates a specified issue for a project. This request is also used to close or reopen an issue using the `state_event` parameter. At least one of the following parameters is required for the request to be successful: `assignee_id`, `assignee_ids`, `confidential`, `created_at`, `description`, `discussion_locked`, `due_date`, `issue_type`, `labels`, `milestone_id`, `state_event`, `title`.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      issue_iid: {
        type: "integer",
        description: "Internal ID of the issue.",
      },
      title: {
        type: "string",
        description:
          "Title of the issue. At least one of `assignee_id`, `assignee_ids`, `confidential`, `created_at`, `description`, `discussion_locked`, `due_date`, `start_date`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `severity`, `state_event`, `title`, `issue_type`, `weight`, `epic_id`, `epic_iid` must be provided.",
      },
      updated_at: {
        type: "string",
        description:
          "Date and time the issue was updated. Administrators or project owners only. Empty or null values are not accepted.",
      },
      state_event: {
        type: "string",
        description:
          "Event to change the state of the issue. At least one of `assignee_id`, `assignee_ids`, `confidential`, `created_at`, `description`, `discussion_locked`, `due_date`, `start_date`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `severity`, `state_event`, `title`, `issue_type`, `weight`, `epic_id`, `epic_iid` must be provided.",
        enum: ["reopen", "close"],
      },
      description: {
        type: "string",
        description:
          "Description of the issue. Limited to 1,048,576 characters. At least one of `assignee_id`, `assignee_ids`, `confidential`, `created_at`, `description`, `discussion_locked`, `due_date`, `start_date`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `severity`, `state_event`, `title`, `issue_type`, `weight`, `epic_id`, `epic_iid` must be provided.",
      },
      assignee_ids: {
        type: "array",
        description:
          "IDs of the users to assign to the issue. Set to `0` or leave empty to unassign all assignees. Assigning more than one user is Premium and Ultimate only. At least one of `assignee_id`, `assignee_ids`, `confidential`, `created_at`, `description`, `discussion_locked`, `due_date`, `start_date`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `severity`, `state_event`, `title`, `…",
        items: {
          type: "integer",
        },
      },
      assignee_id: {
        type: "integer",
        description:
          "ID of the user to assign the issue to. Available only on GitLab Free. Deprecated. Use `assignee_ids` instead. At least one of `assignee_id`, `assignee_ids`, `confidential`, `created_at`, `description`, `discussion_locked`, `due_date`, `start_date`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `severity`, `state_event`, `title`, `issue_type`, `weight`, `epic_id`, `epic_iid…",
      },
      milestone_id: {
        type: "integer",
        description:
          "Global ID of a milestone to assign to the issue. Set to `0` or leave empty to unassign the milestone. Mutually exclusive with `milestone`. At least one of `assignee_id`, `assignee_ids`, `confidential`, `created_at`, `description`, `discussion_locked`, `due_date`, `start_date`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `severity`, `state_event`, `title`, `issue_type`, `…",
      },
      milestone: {
        type: "string",
        description:
          "The title of a project or ancestor-group milestone to assign the issue to. Mutually exclusive with `milestone_id`. At least one of `assignee_id`, `assignee_ids`, `confidential`, `created_at`, `description`, `discussion_locked`, `due_date`, `start_date`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `severity`, `state_event`, `title`, `issue_type`, `weight`, `epic_id`, `epi…",
      },
      labels: {
        type: "array",
        description:
          "Comma-separated list of label names. `None` means no labels are assigned. `Any` means at least one label is assigned. `No+Label` (deprecated) means no labels are assigned. Set to an empty string to unassign all labels. If a label does not already exist, this creates a new project label and assigns it to the issue. Predefined names are case-insensitive. At least one of `assignee_id`, `assignee_ids…",
        items: {
          type: "string",
        },
      },
      add_labels: {
        type: "array",
        description:
          "Comma-separated label names to add to the issue. If a label does not already exist, this creates a new project label and assigns it to the issue. At least one of `assignee_id`, `assignee_ids`, `confidential`, `created_at`, `description`, `discussion_locked`, `due_date`, `start_date`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `severity`, `state_event`, `title`, `issue_t…",
        items: {
          type: "string",
        },
      },
      remove_labels: {
        type: "array",
        description:
          "Comma-separated label names to remove from the issue. At least one of `assignee_id`, `assignee_ids`, `confidential`, `created_at`, `description`, `discussion_locked`, `due_date`, `start_date`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `severity`, `state_event`, `title`, `issue_type`, `weight`, `epic_id`, `epic_iid` must be provided.",
        items: {
          type: "string",
        },
      },
      due_date: {
        type: "string",
        description:
          "Due date, in the format `YYYY-MM-DD`, for example `2016-03-11`. At least one of `assignee_id`, `assignee_ids`, `confidential`, `created_at`, `description`, `discussion_locked`, `due_date`, `start_date`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `severity`, `state_event`, `title`, `issue_type`, `weight`, `epic_id`, `epic_iid` must be provided.",
      },
      start_date: {
        type: "string",
        description:
          "Start date, in the format `YYYY-MM-DD`, for example `2016-03-11`. Introduced in GitLab 19.1. At least one of `assignee_id`, `assignee_ids`, `confidential`, `created_at`, `description`, `discussion_locked`, `due_date`, `start_date`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `severity`, `state_event`, `title`, `issue_type`, `weight`, `epic_id`, `epic_iid` must be provide…",
      },
      confidential: {
        type: "boolean",
        description:
          "If `true`, the issue is confidential. At least one of `assignee_id`, `assignee_ids`, `confidential`, `created_at`, `description`, `discussion_locked`, `due_date`, `start_date`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `severity`, `state_event`, `title`, `issue_type`, `weight`, `epic_id`, `epic_iid` must be provided.",
      },
      discussion_locked: {
        type: "boolean",
        description:
          "If `true`, locks the issue's discussion so only project members can add or edit comments. At least one of `assignee_id`, `assignee_ids`, `confidential`, `created_at`, `description`, `discussion_locked`, `due_date`, `start_date`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `severity`, `state_event`, `title`, `issue_type`, `weight`, `epic_id`, `epic_iid` must be provided.",
      },
      issue_type: {
        type: "string",
        description:
          "The type of the issue. Accepts: issue, incident, test_case, requirement, task, ticket. At least one of `assignee_id`, `assignee_ids`, `confidential`, `created_at`, `description`, `discussion_locked`, `due_date`, `start_date`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `severity`, `state_event`, `title`, `issue_type`, `weight`, `epic_id`, `epic_iid` must be provided.",
        enum: ["issue", "incident", "test_case", "requirement", "task", "ticket"],
      },
      severity: {
        type: "string",
        description:
          "The severity of the issue. Only applies to incidents. Accepts: unknown, low, medium, high, critical. At least one of `assignee_id`, `assignee_ids`, `confidential`, `created_at`, `description`, `discussion_locked`, `due_date`, `start_date`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `severity`, `state_event`, `title`, `issue_type`, `weight`, `epic_id`, `epic_iid` must be…",
        enum: ["unknown", "low", "medium", "high", "critical"],
      },
      weight: {
        type: "integer",
        description:
          "The weight of the issue. At least one of `assignee_id`, `assignee_ids`, `confidential`, `created_at`, `description`, `discussion_locked`, `due_date`, `start_date`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `severity`, `state_event`, `title`, `issue_type`, `weight`, `epic_id`, `epic_iid` must be provided.",
      },
      epic_id: {
        type: "integer",
        description:
          "ID of an epic to associate the issue with. Must be `0` or greater. Premium and Ultimate only. Mutually exclusive with `epic_iid`. At least one of `assignee_id`, `assignee_ids`, `confidential`, `created_at`, `description`, `discussion_locked`, `due_date`, `start_date`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `severity`, `state_event`, `title`, `issue_type`, `weight`,…",
      },
      epic_iid: {
        type: "integer",
        description:
          "Internal ID of an epic to associate the issue with. Must be `0` or greater. Deprecated and scheduled for removal in API version 5. Premium and Ultimate only. Mutually exclusive with `epic_id`. At least one of `assignee_id`, `assignee_ids`, `confidential`, `created_at`, `description`, `discussion_locked`, `due_date`, `start_date`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone…",
      },
      created_at: {
        type: "string",
        description:
          "At least one of `assignee_id`, `assignee_ids`, `confidential`, `created_at`, `description`, `discussion_locked`, `due_date`, `start_date`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `severity`, `state_event`, `title`, `issue_type`, `weight`, `epic_id`, `epic_iid` must be provided.",
      },
    },
    required: ["id", "issue_iid"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/issues/{issue_iid}",
    body: [
      "title",
      "updated_at",
      "state_event",
      "description",
      "assignee_ids",
      "assignee_id",
      "milestone_id",
      "milestone",
      "labels",
      "add_labels",
      "remove_labels",
      "due_date",
      "start_date",
      "confidential",
      "discussion_locked",
      "issue_type",
      "severity",
      "weight",
      "epic_id",
      "epic_iid",
      "created_at",
    ],
  },
});
