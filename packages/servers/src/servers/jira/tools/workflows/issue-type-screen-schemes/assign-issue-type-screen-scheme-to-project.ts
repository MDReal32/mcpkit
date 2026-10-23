import { defineTool } from "@usemcpkit/core";

export const workflowsIssueTypeScreenSchemesAssignIssueTypeScreenSchemeToProject = defineTool({
  name: "workflows:issue_type_screen_schemes:assign_issue_type_screen_scheme_to_project",
  description: "Assign issue type screen scheme to project. Assigns an issue type screen scheme to a project.",
  input: {
    type: "object",
    properties: {
      issueTypeScreenSchemeId: {
        type: "string",
        description: "The ID of the issue type screen scheme.",
      },
      projectId: {
        type: "string",
        description: "The ID of the project.",
      },
    },
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/issuetypescreenscheme/project",
    body: ["issueTypeScreenSchemeId", "projectId"],
  },
});
