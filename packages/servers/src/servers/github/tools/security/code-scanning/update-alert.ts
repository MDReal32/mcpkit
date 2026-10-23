import { defineTool } from "@usemcpkit/core";

export const securityCodeScanningUpdateAlert = defineTool({
  name: "security:code_scanning:update_alert",
  description:
    "Update a code scanning alert. Updates the status of a single code scanning alert. OAuth app tokens and personal access tokens (classic) need the `security_events` scope to use this endpoint with private or public repositories, or the `public_repo` scope to use this endpoint with only public repositories.",
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
      alert_number: {
        type: "integer",
        description:
          "The number that identifies an alert. You can find this at the end of the URL for a code scanning alert within GitHub, and in the `number` field in the response from the `GET /repos/{owner}/{repo}/code-scanning/alerts` operation.",
      },
      state: {
        type: "string",
        description:
          "Sets the state of the code scanning alert. You must provide `dismissed_reason` when you set the state to `dismissed`.",
        enum: ["open", "dismissed"],
      },
      dismissed_reason: {
        type: "string",
        description: "**Required when the state is dismissed.** The reason for dismissing or closing the alert.",
        enum: ["false positive", "won't fix", "used in tests", "mitigated"],
      },
      dismissed_comment: {
        type: "string",
        description: "The dismissal comment associated with the dismissal of the alert.",
      },
      create_request: {
        type: "boolean",
        description: "If `true`, attempt to create an alert dismissal request.",
      },
      assignees: {
        type: "array",
        description:
          "The list of users to assign to the code scanning alert. An empty array unassigns all previous assignees from the alert.",
        items: {
          type: "string",
        },
      },
    },
    required: ["owner", "repo", "alert_number"],
  },
  request: {
    method: "PATCH",
    path: "/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}",
    body: ["state", "dismissed_reason", "dismissed_comment", "create_request", "assignees"],
  },
});
