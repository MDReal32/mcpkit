import { defineTool } from "@usemcpkit/core";

export const issuesReactionsCreateForRelease = defineTool({
  name: "issues:reactions:create_for_release",
  description:
    "Create reaction for a release. Create a reaction to a release. A response with a `Status: 200 OK` means that you already added the reaction type to this release.",
  input: {
    type: "object",
    properties: {
      owner: {
        type: "string",
        description: "The account owner of the repository. The name is not case sensitive.",
      },
      repo: {
        type: "string",
        description: "The name of the repository without the `.git` extension. The name is not case sensitive.",
      },
      release_id: {
        type: "integer",
        description: "The unique identifier of the release.",
      },
      content: {
        type: "string",
        description: "The reaction type to add to the release.",
        enum: ["+1", "laugh", "heart", "hooray", "rocket", "eyes"],
      },
    },
    required: ["owner", "repo", "release_id", "content"],
  },
  request: {
    method: "POST",
    path: "/repos/{owner}/{repo}/releases/{release_id}/reactions",
    body: ["content"],
  },
});
