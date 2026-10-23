import { defineTool } from "@usemcpkit/core";

export const securityCodeScanningListAlertInstances = defineTool({
  name: "security:code_scanning:list_alert_instances",
  description: "List instances of a code scanning alert. Lists all instances of the specified code scanning alert.",
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
      page: {
        type: "integer",
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
      per_page: {
        type: "integer",
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      ref: {
        type: "string",
        description:
          "The Git reference for the results you want to list. The `ref` for a branch can be formatted either as `refs/heads/<branch name>` or simply `<branch name>`. To reference a pull request use `refs/pull/<number>/merge`.",
      },
      pr: {
        type: "integer",
        description: "The number of the pull request for the results you want to list.",
      },
    },
    required: ["owner", "repo", "alert_number"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances",
    query: ["page", "per_page", "ref", "pr"],
  },
});
