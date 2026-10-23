import { defineTool } from "@usemcpkit/core";

export const issuesIssueNavigatorSettingsSetIssueNavigatorDefaultColumns = defineTool({
  name: "issues:issue_navigator_settings:set_issue_navigator_default_columns",
  description: "Set issue navigator default columns. Sets the default issue navigator columns.",
  input: {
    type: "object",
    properties: {
      columns: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/settings/columns",
    body: ["columns"],
    contentType: "multipart/form-data",
  },
});
