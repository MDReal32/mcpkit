import { defineTool } from "@usemcpkit/core";

export const issuesIssuesExportArchivedIssues = defineTool({
  name: "issues:issues:export_archived_issues",
  description:
    "Export archived issue(s). Enables admins to retrieve details of all archived issues. Upon a successful request, the admin who submitted it will receive an email with a link to download a CSV file with the issue details.",
  input: {
    type: "object",
    properties: {
      archivedBy: {
        type: "array",
        description: "List archived issues archived by a specified account ID.",
        items: {
          type: "string",
        },
      },
      archivedDateRange: {
        type: "object",
        description: "List issues archived within a specified date range.",
        properties: {
          dateAfter: {
            type: "string",
            description: "List issues archived after a specified date, passed in the YYYY-MM-DD format.",
          },
          dateBefore: {
            type: "string",
            description: "List issues archived before a specified date provided in the YYYY-MM-DD format.",
          },
        },
        required: ["dateAfter", "dateBefore"],
      },
      issueTypes: {
        type: "array",
        description: "List archived issues with a specified issue type ID.",
        items: {
          type: "string",
        },
      },
      projects: {
        type: "array",
        description: "List archived issues with a specified project key.",
        items: {
          type: "string",
        },
      },
      reporters: {
        type: "array",
        description: "List archived issues where the reporter is a specified account ID.",
        items: {
          type: "string",
        },
      },
    },
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/issues/archive/export",
    body: ["archivedBy", "archivedDateRange", "issueTypes", "projects", "reporters"],
  },
});
