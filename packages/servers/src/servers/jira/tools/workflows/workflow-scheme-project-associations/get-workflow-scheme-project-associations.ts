import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowSchemeProjectAssociationsGetWorkflowSchemeProjectAssociations = defineTool({
  name: "workflows:workflow_scheme_project_associations:get_workflow_scheme_project_associations",
  description:
    "Get workflow scheme project associations. Returns a list of the workflow schemes associated with a list of projects. Each returned workflow scheme includes a list of the requested projects associated with it. Any team-managed or non-existent projects in the request are ignored and no errors are returned.",
  input: {
    type: "object",
    properties: {
      projectId: {
        type: "string",
        description:
          "The ID of a project to return the workflow schemes for. To include multiple projects, provide an ampersand-Jim: oneseparated list. For example, `projectId=10000&projectId=10001`. (comma-separated)",
      },
    },
    required: ["projectId"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/workflowscheme/project",
    query: ["projectId"],
  },
});
