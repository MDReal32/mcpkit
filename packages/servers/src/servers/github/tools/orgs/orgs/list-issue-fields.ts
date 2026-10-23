import { defineTool } from "@usemcpkit/core";

export const orgsOrgsListIssueFields = defineTool({
  name: "orgs:orgs:list_issue_fields",
  description:
    "List issue fields for an organization. Lists all issue fields for an organization. OAuth app tokens and personal access tokens (classic) need the read:org scope to use this endpoint.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
    },
    required: ["org"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/issue-fields",
  },
});
