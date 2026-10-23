import { defineTool } from "@usemcpkit/core";

export const softwareIssueGetIssue = defineTool({
  name: "software:issue:get_issue",
  description:
    "Get issue. Returns a single issue, for a given issue ID or issue key. Issues returned from this resource include Agile fields, like sprint, closedSprints, flagged, and epic.",
  input: {
    type: "object",
    properties: {
      issueIdOrKey: {
        type: "string",
        description: "The ID or key of the requested issue.",
      },
      fields: {
        type: "string",
        description:
          "The list of fields to return for each issue. By default, all navigable and Agile fields are returned. (comma-separated)",
      },
      expand: {
        type: "string",
        description: "A comma-separated list of the parameters to expand.",
      },
      updateHistory: {
        type: "boolean",
        description:
          "A boolean indicating whether the issue retrieved by this method should be added to the current user's issue history",
      },
    },
    required: ["issueIdOrKey"],
  },
  request: {
    method: "GET",
    path: "/rest/agile/1.0/issue/{issueIdOrKey}",
    query: ["fields", "expand", "updateHistory"],
  },
});
