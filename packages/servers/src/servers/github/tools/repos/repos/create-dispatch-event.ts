import { defineTool } from "@usemcpkit/core";

export const reposReposCreateDispatchEvent = defineTool({
  name: "repos:repos:create_dispatch_event",
  description:
    'Create a repository dispatch event. You can use this endpoint to trigger a webhook event called `repository_dispatch` when you want activity that happens outside of GitHub to trigger a GitHub Actions workflow or GitHub App webhook. You must configure your GitHub Actions workflow or GitHub App to run when the `repository_dispatch` event occurs. For an example `repository_dispatch` webhook payload, see "RepositoryDispatchEvent."',
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
      event_type: {
        type: "string",
        description: "A custom webhook event name. Must be 100 characters or fewer.",
      },
      client_payload: {
        type: "object",
        description:
          "JSON payload with extra information about the webhook event that your action or workflow may use. The maximum number of top-level properties is 10. The total size of the JSON payload must be less than 64KB.",
      },
    },
    required: ["owner", "repo", "event_type"],
  },
  request: {
    method: "POST",
    path: "/repos/{owner}/{repo}/dispatches",
    body: ["event_type", "client_payload"],
  },
});
