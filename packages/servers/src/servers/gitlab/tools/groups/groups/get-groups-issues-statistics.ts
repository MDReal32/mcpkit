import { defineTool } from "@usemcpkit/core";

export const groupsGroupsGetGroupsIssuesStatistics = defineTool({
  name: "groups:groups:get_groups_issues_statistics",
  description: "Retrieve issues statistics for a group. Retrieves statistics for issues in a specified group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      labels: {
        type: "string",
        description:
          "Comma-separated list of label names. `None` means no labels are assigned. `Any` means at least one label is assigned. `No+Label` (deprecated) means no labels are assigned. Set to an empty string to unassign all labels. If a label does not already exist, this creates a new project label and assigns it to the issue. Predefined names are case-insensitive. (comma-separated)",
      },
      milestone: {
        type: "string",
        description:
          "Milestone title. `None` lists all issues with no milestone. `Any` lists all issues that have an assigned milestone. Support for `None` and `Any` is planned for removal. Use the `milestone_id` attribute instead. Mutually exclusive with `milestone_id`.",
      },
      milestone_id: {
        type: "string",
        enum: ["Any", "None", "Upcoming", "Started"],
        description:
          "Return issues assigned to milestones with a given timebox value. `None` lists all issues with no milestone. `Any` lists all issues that have an assigned milestone. `Upcoming` lists all issues assigned to milestones due in the future. `Started` lists all issues assigned to open, started milestones. The logic for `Upcoming` and `Started` differs from the logic used in the GraphQL API. Mutually excl…",
      },
      iids: {
        type: "string",
        description: "Return only the issues having the given `iid`. (comma-separated)",
      },
      search: {
        type: "string",
        description: "Search issues against their `title` and `description`.",
      },
      in: {
        type: "string",
        description:
          "Modify the scope of the `search` attribute to `title`, `description`, or `title,description`. If omitted, defaults to `title,description`.",
      },
      author_id: {
        type: "integer",
        description:
          "Return issues created by the given user ID. Combine with `scope=all` or `scope=assigned_to_me`. Mutually exclusive with `author_username`.",
      },
      author_username: {
        type: "string",
        description: "Return issues created by the given `username`. Mutually exclusive with `author_id`.",
      },
      assignee_id: {
        type: "string",
        description:
          "Return issues assigned to the given user `id`. `None` returns unassigned issues and `Any` returns issues with an assignee. Mutually exclusive with `assignee_username`.",
      },
      assignee_username: {
        type: "string",
        description:
          "Return issues assigned to the given username. In GitLab Community Edition, only a single value is accepted. Otherwise, an invalid parameter error is returned. When multiple usernames are given, only issues assigned to all of them are returned. Mutually exclusive with `assignee_id`. (comma-separated)",
      },
      created_after: {
        type: "string",
        description: "Return issues created on or after the specified time.",
      },
      created_before: {
        type: "string",
        description: "Return issues created on or before the specified time.",
      },
      updated_after: {
        type: "string",
        description: "Return issues updated on or after the specified time.",
      },
      updated_before: {
        type: "string",
        description: "Return issues updated on or before the specified time.",
      },
      not: {
        type: "object",
        description: "Return issues that do not match the specified parameters.",
      },
      not_labels: {
        type: "string",
        description: "Comma-separated list of label names. (comma-separated)",
      },
      not_milestone: {
        type: "string",
        description: "Milestone title. Mutually exclusive with `not[milestone_id]`.",
      },
      not_milestone_id: {
        type: "string",
        enum: ["Any", "None", "Upcoming", "Started"],
        description:
          "Return issues assigned to milestones without the specified timebox value. Mutually exclusive with `not[milestone]`.",
      },
      not_iids: {
        type: "string",
        description: "Internal IDs of issues to exclude. (comma-separated)",
      },
      not_author_id: {
        type: "integer",
        description:
          "Return issues not authored by the user with the given ID. Mutually exclusive with `not[author_username]`.",
      },
      not_author_username: {
        type: "string",
        description:
          "Return issues not authored by the user with the given username. Mutually exclusive with `not[author_id]`.",
      },
      not_assignee_id: {
        type: "integer",
        description:
          "Return issues not assigned to the user with the given ID. Mutually exclusive with `not[assignee_username]`.",
      },
      not_assignee_username: {
        type: "string",
        description:
          "Return issues not assigned to the user with the given username. Mutually exclusive with `not[assignee_id]`. (comma-separated)",
      },
      not_weight: {
        type: "integer",
        description: "Return issues that do not have the specified weight.",
      },
      not_iteration_id: {
        type: "string",
        description:
          "Return issues not assigned to the iteration with the given ID. Mutually exclusive with `not[iteration_title]`.",
      },
      not_iteration_title: {
        type: "string",
        description:
          "Return issues not assigned to the iteration with the given title. Mutually exclusive with `not[iteration_id]`.",
      },
      scope: {
        type: "string",
        enum: ["created-by-me", "assigned-to-me", "created_by_me", "assigned_to_me", "all"],
        description: "Return issues for the given scope.",
      },
      my_reaction_emoji: {
        type: "string",
        description:
          "Return issues reacted to by the authenticated user with the given `emoji`. `None` returns issues with no reaction and `Any` returns issues with at least one reaction.",
      },
      confidential: {
        type: "boolean",
        description: "If `true`, returns only confidential issues. If `false`, returns only public issues.",
      },
      weight: {
        type: "string",
        description: "The weight of the issue",
      },
      epic_id: {
        type: "string",
        description:
          "Return issues associated with the epic with the given ID. `None` returns issues that are not associated with an epic. `Any` returns issues that are associated with an epic. Premium and Ultimate only.",
      },
      health_status: {
        type: "string",
        enum: ["on_track", "needs_attention", "at_risk", "none", "any"],
        description: "The health status of the issue. Must be one of: on_track, needs_attention, at_risk, none, any",
      },
      iteration_id: {
        type: "string",
        description:
          "Return issues assigned to the iteration with the given ID. `None` returns issues that do not belong to an iteration. `Any` returns issues that belong to an iteration. Premium and Ultimate only. Mutually exclusive with `iteration_title`.",
      },
      iteration_title: {
        type: "string",
        description:
          "Return issues assigned to the iteration with the given title. Premium and Ultimate only. Mutually exclusive with `iteration_id`.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/issues_statistics",
    query: {
      labels: "labels",
      milestone: "milestone",
      milestone_id: "milestone_id",
      iids: "iids",
      search: "search",
      in: "in",
      author_id: "author_id",
      author_username: "author_username",
      assignee_id: "assignee_id",
      assignee_username: "assignee_username",
      created_after: "created_after",
      created_before: "created_before",
      updated_after: "updated_after",
      updated_before: "updated_before",
      not: "not",
      "not[labels]": "not_labels",
      "not[milestone]": "not_milestone",
      "not[milestone_id]": "not_milestone_id",
      "not[iids]": "not_iids",
      "not[author_id]": "not_author_id",
      "not[author_username]": "not_author_username",
      "not[assignee_id]": "not_assignee_id",
      "not[assignee_username]": "not_assignee_username",
      "not[weight]": "not_weight",
      "not[iteration_id]": "not_iteration_id",
      "not[iteration_title]": "not_iteration_title",
      scope: "scope",
      my_reaction_emoji: "my_reaction_emoji",
      confidential: "confidential",
      weight: "weight",
      epic_id: "epic_id",
      health_status: "health_status",
      iteration_id: "iteration_id",
      iteration_title: "iteration_title",
    },
    commaQuery: ["labels", "iids"],
  },
});
