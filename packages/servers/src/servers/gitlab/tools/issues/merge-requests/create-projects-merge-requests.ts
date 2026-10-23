import { defineTool } from "@usemcpkit/core";

export const issuesMergeRequestsCreateProjectsMergeRequests = defineTool({
  name: "issues:merge_requests:create_projects_merge_requests",
  description: "Create a merge request. Creates a merge request for a project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      title: {
        type: "string",
        description: "Title of the merge request.",
      },
      source_branch: {
        type: "string",
        description: "Source branch.",
      },
      target_branch: {
        type: "string",
        description: "Target branch.",
      },
      target_project_id: {
        type: "integer",
        description: "ID of the target project for the merge request. If omitted, defaults to the source project.",
      },
      assignee_id: {
        type: "integer",
        description:
          "ID of the user to assign to the merge request. Set to `0` or leave empty to unassign all assignees.",
      },
      assignee_ids: {
        type: "array",
        description:
          "IDs of the users to assign to the merge request, as a comma-separated list. Set to `0` or leave empty to unassign all assignees.",
        items: {
          type: "integer",
        },
      },
      reviewer_ids: {
        type: "array",
        description:
          "IDs of the users to set as reviewers of the merge request, as a comma-separated list. If set to `0` or left empty, no reviewers are set.",
        items: {
          type: "integer",
        },
      },
      description: {
        type: "string",
        description: "Description of the merge request. Limited to 1,048,576 characters.",
      },
      labels: {
        type: "array",
        description:
          "Comma-separated label names for the merge request. If a label does not already exist, this creates a new project label and assigns it to the merge request. Set to an empty string to unassign all labels.",
        items: {
          type: "string",
        },
      },
      add_labels: {
        type: "array",
        description:
          "Comma-separated label names to add to the merge request. If a label does not already exist, this creates a new project label and assigns it to the merge request.",
        items: {
          type: "string",
        },
      },
      remove_labels: {
        type: "array",
        description: "Comma-separated label names to remove from the merge request.",
        items: {
          type: "string",
        },
      },
      milestone_id: {
        type: "integer",
        description:
          "Global ID of a milestone to assign to the merge request. Set to `0` or leave empty to unassign the milestone. Mutually exclusive with `milestone`.",
      },
      milestone: {
        type: "string",
        description:
          "The title of a project or ancestor-group milestone to assign the merge request to. Mutually exclusive with `milestone_id`.",
      },
      remove_source_branch: {
        type: "boolean",
        description: "If `true`, the source branch is removed when the merge request merges.",
      },
      allow_collaboration: {
        type: "boolean",
        description: "If `true`, allows commits from members who can merge to the target branch.",
      },
      allow_maintainer_to_push: {
        type: "boolean",
        description:
          "If `true`, allows commits from members who can merge to the target branch. Deprecated. Use `allow_collaboration` instead.",
      },
      squash: {
        type: "boolean",
        description:
          "If `true`, squashes all commits into a single commit on merge. When omitted, defaults to the project's squash option setting, which can override this value at merge time.",
      },
      merge_after: {
        type: "string",
        description: "Date after which the merge request can be merged. Introduced in GitLab 17.8.",
      },
      approvals_before_merge: {
        type: "integer",
        description:
          "Number of approvals required before the merge request can be merged. Deprecated in GitLab 16.0. Premium and Ultimate only.",
      },
    },
    required: ["id", "title", "source_branch", "target_branch"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/merge_requests",
    body: [
      "title",
      "source_branch",
      "target_branch",
      "target_project_id",
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
