import { defineTool } from "@usemcpkit/core";

export const workflowsIssueTypeSchemesAssignIssueTypeSchemeToProject = defineTool({
  name: "workflows:issue_type_schemes:assign_issue_type_scheme_to_project",
  description: "Assign issue type scheme to project. Assigns an issue type scheme to a project.",
  input: {
    type: "object",
    properties: {
      issueTypeSchemeId: {
        type: "string",
        description: "The ID of the issue type scheme.",
      },
      projectId: {
        type: "string",
        description: "The ID of the project.",
      },
    },
    required: ["issueTypeSchemeId", "projectId"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/issuetypescheme/project",
    body: ["issueTypeSchemeId", "projectId"],
  },
});
