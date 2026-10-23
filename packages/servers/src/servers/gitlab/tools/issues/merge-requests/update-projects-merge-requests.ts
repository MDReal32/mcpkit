import { defineTool } from "@usemcpkit/core";

export const issuesMergeRequestsUpdateProjectsMergeRequests = defineTool({
  name: "issues:merge_requests:update_projects_merge_requests",
  description: "Update a merge request. Updates a merge request for a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      merge_request_iid: {
        type: "integer",
        description: "Internal ID of the merge request.",
      },
      title: {
        type: "string",
        description:
          "Title of the merge request. At least one of `assignee_id`, `assignee_ids`, `reviewer_ids`, `description`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `remove_source_branch`, `allow_collaboration`, `allow_maintainer_to_push`, `squash`, `target_branch`, `title`, `state_event`, `discussion_locked`, `merge_after` must be provided.",
      },
      target_branch: {
        type: "string",
        description:
          "Target branch. At least one of `assignee_id`, `assignee_ids`, `reviewer_ids`, `description`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `remove_source_branch`, `allow_collaboration`, `allow_maintainer_to_push`, `squash`, `target_branch`, `title`, `state_event`, `discussion_locked`, `merge_after` must be provided.",
      },
      state_event: {
        type: "string",
        description:
          "Event to change the state of the merge request. At least one of `assignee_id`, `assignee_ids`, `reviewer_ids`, `description`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `remove_source_branch`, `allow_collaboration`, `allow_maintainer_to_push`, `squash`, `target_branch`, `title`, `state_event`, `discussion_locked`, `merge_after` must be provided.",
        enum: ["close", "reopen"],
      },
      discussion_locked: {
        type: "boolean",
        description:
          "If `true`, locks the merge request's discussion so only project members can add, edit, or resolve comments. At least one of `assignee_id`, `assignee_ids`, `reviewer_ids`, `description`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `remove_source_branch`, `allow_collaboration`, `allow_maintainer_to_push`, `squash`, `target_branch`, `title`, `state_event`, `discussion_locke…",
      },
      assignee_id: {
        type: "integer",
        description:
          "ID of the user to assign to the merge request. Set to `0` or leave empty to unassign all assignees. At least one of `assignee_id`, `assignee_ids`, `reviewer_ids`, `description`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `remove_source_branch`, `allow_collaboration`, `allow_maintainer_to_push`, `squash`, `target_branch`, `title`, `state_event`, `discussion_locked`, `mer…",
      },
      assignee_ids: {
        type: "array",
        description:
          "IDs of the users to assign to the merge request, as a comma-separated list. Set to `0` or leave empty to unassign all assignees. At least one of `assignee_id`, `assignee_ids`, `reviewer_ids`, `description`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `remove_source_branch`, `allow_collaboration`, `allow_maintainer_to_push`, `squash`, `target_branch`, `title`, `state_even…",
        items: {
          type: "integer",
        },
      },
      reviewer_ids: {
        type: "array",
        description:
          "IDs of the users to set as reviewers of the merge request, as a comma-separated list. If set to `0` or left empty, no reviewers are set. At least one of `assignee_id`, `assignee_ids`, `reviewer_ids`, `description`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `remove_source_branch`, `allow_collaboration`, `allow_maintainer_to_push`, `squash`, `target_branch`, `title`, `st…",
        items: {
          type: "integer",
        },
      },
      description: {
        type: "string",
        description:
          "Description of the merge request. Limited to 1,048,576 characters. At least one of `assignee_id`, `assignee_ids`, `reviewer_ids`, `description`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `remove_source_branch`, `allow_collaboration`, `allow_maintainer_to_push`, `squash`, `target_branch`, `title`, `state_event`, `discussion_locked`, `merge_after` must be provided.",
      },
      labels: {
        type: "array",
        description:
          "Comma-separated label names for the merge request. If a label does not already exist, this creates a new project label and assigns it to the merge request. Set to an empty string to unassign all labels. At least one of `assignee_id`, `assignee_ids`, `reviewer_ids`, `description`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `remove_source_branch`, `allow_collaboration`, `…",
        items: {
          type: "string",
        },
      },
      add_labels: {
        type: "array",
        description:
          "Comma-separated label names to add to the merge request. If a label does not already exist, this creates a new project label and assigns it to the merge request. At least one of `assignee_id`, `assignee_ids`, `reviewer_ids`, `description`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `remove_source_branch`, `allow_collaboration`, `allow_maintainer_to_push`, `squash`, `tar…",
        items: {
          type: "string",
        },
      },
      remove_labels: {
        type: "array",
        description:
          "Comma-separated label names to remove from the merge request. At least one of `assignee_id`, `assignee_ids`, `reviewer_ids`, `description`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `remove_source_branch`, `allow_collaboration`, `allow_maintainer_to_push`, `squash`, `target_branch`, `title`, `state_event`, `discussion_locked`, `merge_after` must be provided.",
        items: {
          type: "string",
        },
      },
      milestone_id: {
        type: "integer",
        description:
          "Global ID of a milestone to assign to the merge request. Set to `0` or leave empty to unassign the milestone. Mutually exclusive with `milestone`. At least one of `assignee_id`, `assignee_ids`, `reviewer_ids`, `description`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `remove_source_branch`, `allow_collaboration`, `allow_maintainer_to_push`, `squash`, `target_branch`, `t…",
      },
      milestone: {
        type: "string",
        description:
          "The title of a project or ancestor-group milestone to assign the merge request to. Mutually exclusive with `milestone_id`. At least one of `assignee_id`, `assignee_ids`, `reviewer_ids`, `description`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `remove_source_branch`, `allow_collaboration`, `allow_maintainer_to_push`, `squash`, `target_branch`, `title`, `state_event`, `d…",
      },
      remove_source_branch: {
        type: "boolean",
        description:
          "If `true`, the source branch is removed when the merge request merges. At least one of `assignee_id`, `assignee_ids`, `reviewer_ids`, `description`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `remove_source_branch`, `allow_collaboration`, `allow_maintainer_to_push`, `squash`, `target_branch`, `title`, `state_event`, `discussion_locked`, `merge_after` must be provided.",
      },
      allow_collaboration: {
        type: "boolean",
        description:
          "If `true`, allows commits from members who can merge to the target branch. At least one of `assignee_id`, `assignee_ids`, `reviewer_ids`, `description`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `remove_source_branch`, `allow_collaboration`, `allow_maintainer_to_push`, `squash`, `target_branch`, `title`, `state_event`, `discussion_locked`, `merge_after` must be provide…",
      },
      allow_maintainer_to_push: {
        type: "boolean",
        description:
          "If `true`, allows commits from members who can merge to the target branch. Deprecated. Use `allow_collaboration` instead. At least one of `assignee_id`, `assignee_ids`, `reviewer_ids`, `description`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `remove_source_branch`, `allow_collaboration`, `allow_maintainer_to_push`, `squash`, `target_branch`, `title`, `state_event`, `di…",
      },
      squash: {
        type: "boolean",
        description:
          "If `true`, squashes all commits into a single commit on merge. When omitted, defaults to the project's squash option setting, which can override this value at merge time. At least one of `assignee_id`, `assignee_ids`, `reviewer_ids`, `description`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `remove_source_branch`, `allow_collaboration`, `allow_maintainer_to_push`, `squa…",
      },
      merge_after: {
        type: "string",
        description:
          "Date after which the merge request can be merged. Introduced in GitLab 17.8. At least one of `assignee_id`, `assignee_ids`, `reviewer_ids`, `description`, `labels`, `add_labels`, `remove_labels`, `milestone_id`, `milestone`, `remove_source_branch`, `allow_collaboration`, `allow_maintainer_to_push`, `squash`, `target_branch`, `title`, `state_event`, `discussion_locked`, `merge_after` must be provi…",
      },
      approvals_before_merge: {
        type: "integer",
        description:
          "Number of approvals required before the merge request can be merged. Deprecated in GitLab 16.0. Premium and Ultimate only.",
      },
    },
    required: ["id", "merge_request_iid"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/merge_requests/{merge_request_iid}",
    body: [
      "title",
      "target_branch",
      "state_event",
      "discussion_locked",
      "assignee_id",
      "assignee_ids",
      "reviewer_ids",
      "description",
      "labels",
      "add_labels",
      "remove_labels",
      "milestone_id",
      "milestone",
      "remove_source_branch",
      "allow_collaboration",
      "allow_maintainer_to_push",
      "squash",
      "merge_after",
      "approvals_before_merge",
    ],
  },
});
