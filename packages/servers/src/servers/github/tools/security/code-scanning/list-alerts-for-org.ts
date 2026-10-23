import { defineTool } from "@usemcpkit/core";

export const securityCodeScanningListAlertsForOrg = defineTool({
  name: "security:code_scanning:list_alerts_for_org",
  description:
    'List code scanning alerts for an organization. Lists code scanning alerts for the default branch for all eligible repositories in an organization. Eligible repositories are repositories that are owned by organizations that you own or for which you are a security manager. For more information, see "Managing security managers in your organization."',
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      tool_name: {
        type: "string",
        description:
          "The name of a code scanning tool. Only results by this tool will be listed. You can specify the tool by using either `tool_name` or `tool_guid`, but not both.",
      },
      tool_guid: {
        type: "string",
        description:
          "The GUID of a code scanning tool. Only results by this tool will be listed. Note that some code scanning tools may not include a GUID in their analysis data. You can specify the tool by using either `tool_guid` or `tool_name`, but not both.",
      },
      before: {
        type: "string",
        description:
          'A cursor, as given in the Link header. If specified, the query only searches for results before this cursor. For more information, see "Using pagination in the REST API."',
      },
      after: {
        type: "string",
        description:
          'A cursor, as given in the Link header. If specified, the query only searches for results after this cursor. For more information, see "Using pagination in the REST API."',
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
      direction: {
        type: "string",
        default: "desc",
        enum: ["asc", "desc"],
        description: "The direction to sort the results by.",
      },
      state: {
        type: "string",
        description: "If specified, only code scanning alerts with this state will be returned.",
        enum: ["open", "closed", "dismissed", "fixed"],
      },
      sort: {
        type: "string",
        default: "created",
        enum: ["created", "updated"],
        description: "The property by which to sort the results.",
      },
      severity: {
        type: "string",
        description: "If specified, only code scanning alerts with this severity will be returned.",
        enum: ["critical", "high", "medium", "low", "warning", "note", "error"],
      },
      assignees: {
        type: "string",
        description:
          "Filter alerts by assignees. Provide a comma-separated list of user handles (e.g., `octocat` or `octocat,hubot`). Use `*` to list alerts with at least one assignee or `none` to list alerts with no assignees.",
      },
    },
    required: ["org"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/code-scanning/alerts",
    query: [
      "tool_name",
      "tool_guid",
      "before",
      "after",
      "page",
      "per_page",
      "direction",
      "state",
      "sort",
      "severity",
      "assignees",
    ],
  },
});
