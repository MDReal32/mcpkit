import { defineTool } from "@usemcpkit/core";

export const issuesDiscussionsUpdateProjectsMergeRequestsDiscussions = defineTool({
  name: "issues:discussions:update_projects_merge_requests_discussions",
  description:
    "Resolve or unresolve a merge request discussion. Resolves or unresolves a specified merge request discussion.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      noteable_id: {
        type: "integer",
        description: "ID of the merge request.",
      },
      discussion_id: {
        type: "string",
        description: "ID of the discussion.",
      },
      resolved: {
        type: "boolean",
        description: "If `true`, resolves the discussion. If `false`, reopens the discussion.",
      },
    },
    required: ["id", "noteable_id", "discussion_id", "resolved"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/merge_requests/{noteable_id}/discussions/{discussion_id}",
    body: ["resolved"],
  },
});
