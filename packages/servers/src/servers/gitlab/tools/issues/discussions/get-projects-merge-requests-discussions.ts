import { defineTool } from "@usemcpkit/core";

export const issuesDiscussionsGetProjectsMergeRequestsDiscussions = defineTool({
  name: "issues:discussions:get_projects_merge_requests_discussions",
  description: "Retrieve a discussion for a merge request. Retrieves a specified discussion for a merge request.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      discussion_id: {
        type: "string",
        description: "ID of the discussion.",
      },
      noteable_id: {
        type: "integer",
        description: "ID of the merge request.",
      },
    },
    required: ["id", "discussion_id", "noteable_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/merge_requests/{noteable_id}/discussions/{discussion_id}",
  },
});
