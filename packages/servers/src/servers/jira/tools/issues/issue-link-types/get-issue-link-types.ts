import { defineTool } from "@usemcpkit/core";

export const issuesIssueLinkTypesGetIssueLinkTypes = defineTool({
  name: "issues:issue_link_types:get_issue_link_types",
  description: "Get issue link types. Returns a list of all issue link types.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/rest/api/2/issueLinkType",
  },
});
